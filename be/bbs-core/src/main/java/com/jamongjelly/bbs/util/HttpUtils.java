package com.jamongjelly.bbs.util;

import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

public class HttpUtils {

    public static ResponseEntity<String> stringResponse(boolean isSuccess, String successMsg, String failureMsg) {
         return isSuccess ? ResponseEntity.ok(successMsg) : ResponseEntity.badRequest().body(failureMsg);
    }

    public static String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        return scheme + "://" + serverName + ":" + serverPort + contextPath;
    }

}
