package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UnregisterRequest {

    @NotBlank
    @Size(min = Constraints.PASSWORD_MIN_LENGTH, max = Constraints.PASSWORD_MAX_LENGTH)
    private String password;

}
