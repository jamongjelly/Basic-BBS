package com.jamongjelly.bbs.service.user;

import com.jamongjelly.bbs.domain.todo.TodoRepository;
import com.jamongjelly.bbs.domain.user.*;
import com.jamongjelly.bbs.dto.request.JoinForm;
import com.jamongjelly.bbs.dto.request.UnregisterRequest;
import com.jamongjelly.bbs.dto.response.UserSummary;
import com.jamongjelly.bbs.exception.BadRequestException;
import com.jamongjelly.bbs.exception.ResourceNotFoundException;
import com.jamongjelly.bbs.util.ImageUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
@Service
public class UserService {

    @Value("${app.resources.location}")
    private String baseFilePath;
    private String profileImgPath = "/profile/";

    @Value("${app.resources.uriPath}")
    private String resourcesUriPath;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TodoRepository todoRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository,
                       RoleRepository roleRepository, TodoRepository todoRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.todoRepository = todoRepository;
    }

    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserSummary join(JoinForm joinForm) {
        User user = User.builder()
                .email(joinForm.getEmail())
                .nickname(joinForm.getNickname())
                .password(passwordEncoder.encode(joinForm.getPassword()))
                .build();

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", RoleName.ROLE_USER));
        user.addUserRole(userRole);
        user.setProvider(AuthProvider.local);

        User result = userRepository.save(user);
        return UserSummary.of(result);
    }

    @Transactional
    public void unregisterUser(UnregisterRequest request, User currentUser) {
        try {
            if (AuthProvider.local.equals(currentUser.getProvider())) {
                if (passwordEncoder.matches(request.getPassword(), currentUser.getPassword())) {
                    currentUser.unregister();
                    todoRepository.deleteByCreatedBy(currentUser.getId());

                    userRepository.save(currentUser);
                } else {
                    throw new BadRequestException("비밀번호가 일치하지 않습니다.");
                }
            }
        } catch (Exception e) {
            log.error("회원탈퇴에 실패했습니다.", e);
            throw new BadRequestException("회원탈퇴에 실패했습니다.", e);
        }
    }

    @Transactional
    public String changeUserNickname(Long userId, String nickname) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setNickname(nickname);
                    return nickname;
                }).orElseThrow(() -> new BadRequestException("닉네임 변경 실패"));
    }

    @Transactional
    public String changeUserProfileMsg(Long userId, String profileMsg) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setProfileMsg(profileMsg);
                    return profileMsg;
                }).orElseThrow(() -> new BadRequestException("프로필 메시지 변경 실패"));
    }

    @Transactional
    public String changeProfileImg(Long userId, MultipartFile imgFile, String baseUrl) throws IOException {
        String originalFileName = imgFile.getOriginalFilename();
        if (originalFileName == null) return null;

        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        UUID uuid = UUID.randomUUID();
        String newImgFileName = uuid + extension;

        String savePath = baseFilePath + profileImgPath;
        File saveDir = new File(savePath);
        if (!saveDir.exists()) {
            saveDir.mkdirs();
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        try {
            ImageUtils.makeThumbnail(imgFile, savePath, newImgFileName, extension.substring(1));

            if (user.getImgUrl() != null) {
                String oldImgFileName = user.getImgUrl().substring(user.getImgUrl().lastIndexOf("/"));
                File oldFile = new File(savePath + oldImgFileName);
                if (oldFile.exists()) {
                    Files.delete(Paths.get(savePath + oldImgFileName));
                }
            }

            user.setImgUrl(baseUrl + resourcesUriPath + profileImgPath + newImgFileName);
        } catch (IOException e) {
            log.error("Fail to change User(" + userId + ")'s Profile Image", e);
            Files.delete(Paths.get(savePath + newImgFileName));
            return null;
        }

        return user.getImgUrl();
    }

    public String getProfileImgUrl(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        return user.getImgUrl();
    }

}
