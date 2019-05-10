/**
 * AUTH
 */
export const APP_SET_AUTH_STATE = "app/setAuthState";
export const UPDATE_APP_MESSAGE = "app/updateMessage";
export const APP_SAVE_LOGGED_USER = "app/saveLoggedUser";
export const APP_REMOVE_LOGGED_USER = "app/removeLoggedUser";
export const APP_SAVE_REFRESH_TOKEN = "app/saveRefreshToken";
export const APP_SAVE_SOCIAL_TYPE = "app/saveSocialType";
export const APP_WIPE_DATA = "app/wipeData";
export const APP_LOGIN = "app/login";
export const APP_LOGOUT = "app/logout";
export const APP_REGISTER = "app/register";
export const APP_VERIFY_TOKEN = "app/verifyToken";
export const APP_SAVE_PUSH_TOKEN = "app/savePushToken";

/**
 * ACCOUNT
 */
export const ACC_GET_PROFILE = "app/getProfile";
export const ACC_REPLACE_PROFILE = "app/replaceProfile";
export const ACC_UPDATE_PROFILE = "app/updateProfile";
export const ACC_SEARCH_PROFILE = "app/searchProfile";
export const ACC_GET_USER_INFO = "app/getUserInfo";

/**
 * NAVIGATOR
 */
export const NAV_RESET = "navigate/reset";
export const NAV_PUSH = "navigate/push";
export const NAV_POP = "navigate/pop";

/**
 * NOTIFICATION
 */
export const GET_ALL_NOTIFICATION = "GET_ALL_NOTIFICATION";
export const GET_SINGLE_NOTIFICATION = "GET_SINGLE_NOTIFICATION";
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION";

export const SAVE_GET_ALL_NOTIFICATION = "SAVE_GET_ALL_NOTIFICATION";
export const SAVE_GET_SINGLE_NOTIFICATION = "SAVE_GET_SINGLE_NOTIFICATION";
export const SAVE_CREATE_NOTIFICATION = "SAVE_CREATE_NOTIFICATION";
export const SAVE_REMOVE_NOTIFICATION = "SAVE_REMOVE_NOTIFICATION";
export const SAVE_UPDATE_NOTIFICATION = "SAVE_UPDATE_NOTIFICATION";

/**
 * REQUEST
 */
export const MARK_REQUEST_PENDING = "request/requestPending";
export const MARK_REQUEST_SUCCESS = "request/requestSuccess";
export const MARK_REQUEST_FAILED = "request/requestFailed";
export const MARK_REQUEST_CANCELLED = "request/requestCancelled";

/**
 * TOAST
 */
export const TOAST_SET = "app/setToast";
export const TOAST_CLEAR = "app/clearToast";

/**
 * MODAL
 */
export const MODAL_OPEN = "app/openModal";
export const MODAL_CLOSE = "app/closeModal";

/**
 * DRAWER
 */
export const DRAWER_OPEN = "app/openDrawer";
export const DRAWER_CLOSE = "app/closeDrawer";

/**
 * INVOKE
 */
export const INVOKE_CALLBACK = "app/invokeCallBack";

/**
 * GALLERY
 */
export const GALLERY_OPEN = "app/playingGallery";
export const GALLERY_CLOSE = "app/closeGallery";

/**
 * BROWSER
 */
export const BROWSER_OPEN = "app/openBrowser";
export const BROWSER_CLOSE = "app/closeBrowser";

//theme
export const CHANGE_THEME = "CHANGE_THEME";
export const SWITCH_ACTIVATION = "SWITCH_ACTIVATION";

//app
export const COLLPSE_CHANGE = "COLLPSE_CHANGE";
export const COLLPSE_OPEN_DRAWER = "COLLPSE_OPEN_DRAWER";
export const CHANGE_OPEN_KEYS = "CHANGE_OPEN_KEYS";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const CHANGE_CURRENT = "CHANGE_CURRENT";
export const CLOSE_ALL = "CLOSE_ALL";
export const SAVE_IS_REQUEST_NOTIFICATION = "SAVE_IS_REQUEST_NOTIFICATION";

//User
export const USER_GET_ALL = "USER_GET_ALL";
export const SAVE_USER_GET_ALL = "SAVE_USER_GET_ALL";
export const USER_UPDATE = "USER_UPDATE";
export const SAVE_USER_UPDATE = "SAVE_USER_UPDATE";

//Business
export const BUSINESS_GET_ALL = "BUSINESS_GET_ALL";
export const SAVE_BUSINESS_GET_ALL = "SAVE_BUSINESS_GET_ALL";
export const BUSINESS_CREATE = "BUSINESS_CREATE";
export const SAVE_BUSINESS_CREATE = "SAVE_BUSINESS_CREATE";

//Module
export const MODULE_GET_ALL = "MODULE_GET_ALL";
export const SAVE_MODULE_GET_ALL = "SAVE_MODULE_GET_ALL";
export const MODULE_CREATE = "MODULE_CREATE";
export const SAVE_MODULE_CREATE = "SAVE_MODULE_CREATE";