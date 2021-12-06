package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JoinForm {

    @NotBlank
    @Email
    @Size(max = Constraints.EMAIL_MAX_LENGTH)
    private String email;

    @NotBlank
    @Size(min = Constraints.NICKNAME_MIN_LENGTH, max = Constraints.NICKNAME_MAX_LENGTH)
    private String nickname;

    @NotBlank
    @Size(min = Constraints.PASSWORD_MIN_LENGTH, max = Constraints.PASSWORD_MAX_LENGTH)
    private String password;

}
