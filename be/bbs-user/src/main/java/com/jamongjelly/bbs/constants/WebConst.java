package com.jamongjelly.bbs.constants;

public abstract class WebConst {

    /** ----- Request Mapping ----- **/
    public static final String AUTH = "/auth";
    public static final String AUTH_LOGIN = "/login";
    public static final String AUTH_JOIN = "/join";
    public static final String AUTH_UNREGISTER = "/unregister";


    public static final String BOARDS = "/boards";

    public static final String POSTS = "/posts";
    public static final String POSTS_BOARD = "/board";
    public static final String POSTS_SEARCH = "/search";
    public static final String POSTS_ATTACHMENTS = "/attachments";
    public static final String POSTS_CURRENT_USER = "/currentUser";
    public static final String POSTS_LIKE = "/like";

    public static final String REPLIES = "/replies";
    public static final String REPLIES_POST = "/post";
    public static final String REPLIES_CURRENT_USER = "/currentUser";

    public static final String SUBJECTS = "/subjects";
    public static final String SUBJECTS_BOARD = "/board";

    public static final String TODOS = "/todos";

    public static final String USERS = "/users";
    public static final String USERS_CURRENT_USER = "/currentUser";
    public static final String USERS_CHANGE_NICKNAME = "/changeNickname";
    public static final String USERS_CHANGE_PROFILE_MSG = "/changeProfileMsg";
    public static final String USERS_CHANGE_PROFILE_IMG = "/changeProfileImg";
    public static final String USERS_GET_PROFILE_IMG = "/getProfileImg";
    public static final String USER_CHECK_EMAIL = "/checkEmail";
    public static final String USER_CHECK_NICKNAME = "/checkNickname";

    public static final String POSTS_SEARCH_BY_SUBJECT_ID = POSTS_SEARCH + SUBJECTS;

    /** ----- Resource Urls ----- **/
    public static final String STATIC_RESOURCES_URL = "/resources/**";

    public static final String[] ignoreUrls = {STATIC_RESOURCES_URL};

    /** ----- URLs ----- **/
    public static final String HOME_URL = "/";
    public static final String OAUTH2_URL = "/oauth2/**";
    public static final String AUTH_URL = AUTH + "/**";
    public static final String JOIN_SUCCESS_URL = "/";
    public static final String PROFILE_IMG_URL = USERS + USERS_GET_PROFILE_IMG + "/**";
    public static final String JWT_ENTRYPOINT = "/error/entrypoint";
    public static final String BOARDS_URL = BOARDS + "/**";
    public static final String POSTS_URL = POSTS + "/**";
    public static final String REPLIES_URL = REPLIES + "/**";
    public static final String CHECK_EMAIL_URL = USERS + USER_CHECK_EMAIL;
    public static final String CHECK_NICKNAME_URL = USERS + USER_CHECK_NICKNAME;

    public static final String[] permittedUrls = {HOME_URL, AUTH_URL, OAUTH2_URL,
            CHECK_EMAIL_URL, CHECK_NICKNAME_URL, JWT_ENTRYPOINT,
            PROFILE_IMG_URL, BOARDS_URL, POSTS_URL, REPLIES_URL};
}
