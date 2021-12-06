package com.jamongjelly.bbs.controller;

import com.jamongjelly.bbs.constants.WebConst;
import com.jamongjelly.bbs.dto.request.JoinForm;
import com.jamongjelly.bbs.dto.request.LoginForm;
import com.jamongjelly.bbs.dto.request.UnregisterRequest;
import com.jamongjelly.bbs.dto.response.JwtAuthResponse;
import com.jamongjelly.bbs.dto.response.UserSummary;
import com.jamongjelly.bbs.exception.BadRequestException;
import com.jamongjelly.bbs.security.CurrentUser;
import com.jamongjelly.bbs.security.UserPrincipal;
import com.jamongjelly.bbs.security.jwt.JwtProvider;
import com.jamongjelly.bbs.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping(WebConst.AUTH)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userService = userService;
    }

    @PostMapping(WebConst.AUTH_LOGIN)
    public ResponseEntity<JwtAuthResponse> login(@RequestBody @Valid LoginForm loginForm) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginForm.getEmail(),
                            loginForm.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(auth);

            String jwt = jwtProvider.generateToken(auth);
            UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
            UserSummary userSummary = UserSummary.of(userPrincipal.getUser());

            return ResponseEntity.ok(new JwtAuthResponse(jwt, userSummary));
        } catch (Exception e) {
            log.error("로그인에 실패했습니다.");
            throw new BadRequestException("로그인에 실패했습니다.", e);
        }
    }

    @PostMapping(WebConst.AUTH_JOIN)
    public ResponseEntity<JwtAuthResponse> join(@RequestBody @Valid JoinForm joinForm) {
        if (userService.checkEmail(joinForm.getEmail())) {
            throw new BadRequestException("해당 Email은 이미 사용 중 입니다.");
        }

        UserSummary userSummary = userService.join(joinForm);

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        joinForm.getEmail(),
                        joinForm.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path(WebConst.JOIN_SUCCESS_URL)
                .buildAndExpand(joinForm.getEmail()).toUri();

        String jwt = jwtProvider.generateToken(auth);
        return ResponseEntity.created(location).body(new JwtAuthResponse(jwt, userSummary));
    }

    @PatchMapping(WebConst.AUTH_UNREGISTER)
    public ResponseEntity<String> unregister(@RequestBody @Valid UnregisterRequest dto,
             @CurrentUser UserPrincipal currentUser, HttpServletRequest request) {
        userService.unregisterUser(dto, currentUser.getUser());
        return ResponseEntity.ok("회원탈퇴 성공");
    }

}
