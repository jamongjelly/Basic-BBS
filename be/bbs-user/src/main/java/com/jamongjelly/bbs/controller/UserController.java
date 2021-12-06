package com.jamongjelly.bbs.controller;

import com.jamongjelly.bbs.constants.WebConst;
import com.jamongjelly.bbs.dto.response.UserIdentityAvailability;
import com.jamongjelly.bbs.dto.response.UserSummary;
import com.jamongjelly.bbs.security.CurrentUser;
import com.jamongjelly.bbs.security.UserPrincipal;
import com.jamongjelly.bbs.service.user.UserService;
import com.jamongjelly.bbs.util.HttpUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(WebConst.USERS)
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /** /users/currentUser **/
    @GetMapping(WebConst.USERS_CURRENT_USER)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserSummary> getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = UserSummary.of(currentUser.getUser());
        return ResponseEntity.ok(userSummary);
    }

    @PatchMapping(WebConst.USERS_CHANGE_NICKNAME)
    public ResponseEntity<String> changeNickname(@CurrentUser UserPrincipal currentUser,
                                                       @RequestBody @Valid Map<String, String> param) {
        String response = userService.changeUserNickname(currentUser.getUserId(), param.get("nickname"));
        return ResponseEntity.ok(response);
    }

    @PatchMapping(WebConst.USERS_CHANGE_PROFILE_MSG)
    public ResponseEntity<String> changeProfileMsg(@CurrentUser UserPrincipal currentUser,
                                                       @RequestBody @Valid Map<String, String> param) {
        String response = userService.changeUserProfileMsg(currentUser.getUserId(), param.get("profileMsg"));
        return ResponseEntity.ok(response);
    }

    @PatchMapping(WebConst.USERS_CHANGE_PROFILE_IMG)
    public ResponseEntity<String> changeProfileImg(@CurrentUser UserPrincipal currentUser,
                                                   @RequestParam("file") @Valid @NotNull MultipartFile imgFile, HttpServletRequest request) throws IOException {
        String newImgUrl = userService.changeProfileImg(currentUser.getUserId(), imgFile, HttpUtils.getBaseUrl(request));
        return newImgUrl != null ? ResponseEntity.ok(newImgUrl)
                : ResponseEntity.badRequest().body("유저 이미지 변경 실패");
    }

    @GetMapping(WebConst.USERS_GET_PROFILE_IMG + "/{userId}")
    public ResponseEntity<String> getProfileImg(@PathVariable Long userId) throws Exception {
//        if (filePath != null) {
//            File file = new File(filePath);
//            return ResponseEntity.ok()
//                    .contentType(MediaType.IMAGE_JPEG).body(Base64.getEncoder().encode(Files.readAllBytes(file.toPath())));
//        }
        return ResponseEntity.ok(userService.getProfileImgUrl(userId));
    }

    /** /users/checkEmail **/
    @GetMapping(WebConst.USER_CHECK_EMAIL)
    public ResponseEntity<UserIdentityAvailability> checkEmail(@RequestParam @Valid @NotNull String email) {
        Boolean available = !userService.checkEmail(email);
        return ResponseEntity.ok(new UserIdentityAvailability(available));
    }

    /** /users/checkNickname **/
    @GetMapping(WebConst.USER_CHECK_NICKNAME)
    public ResponseEntity<UserIdentityAvailability> checkNickname(@RequestParam @Valid @NotNull String nickname) {
        Boolean available = !userService.checkNickname(nickname);
        return ResponseEntity.ok(new UserIdentityAvailability(available));
    }

}
