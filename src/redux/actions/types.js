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
export const NOTIFICATION_GET = "app/getNotification";
export const NOTIFICATION_RECEIVED = "app/receiveNotification";
export const NOTIFICATION_REPLACE = "app/replaceNotification";
export const NOTIFICATION_THROW = "app/throwNotification";

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

//Project
export const GET_ALL_PROJECT = "GET_ALL_PROJECT";
export const SAVE_GET_ALL_PROJECT = "SAVE_GET_ALL_PROJECT";
export const GET_PROJECT = "GET_PROJECT";
export const SAVE_GET_PROJECT = "SAVE_GET_PROJECT";
export const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
export const SAVE_ADD_NEW_PROJECT = "SAVE_ADD_NEW_PROJECT";
export const EDIT_PROJECT = "EDIT_NEW_PROJECT";
export const SAVE_EDIT_PROJECT = "SAVE_EDIT_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const SAVE_DELETE_PROJECT = "SAVE_DELETE_PROJECT";

export const GET_APARTMENT = "GET_APARTMENT";
export const ADD_NEW_APARTMENT = "ADD_NEW_APARTMENT";
export const SAVE_ADD_NEW_APARTMENT = "SAVE_ADD_NEW_APARTMENT";
export const EDIT_APARTMENT = "EDIT_APARTMENT";
export const SAVE_EDIT_APARTMENT = "SAVE_EDIT_APARTMENT";
export const DELETE_APARTMENT = "DELETE_APARTMENT";
export const SAVE_DELETE_APARTMENT = "SAVE_DELETE_APARTMENT";

//Promotion
export const GET_ALL_PROMOTION = "GET_ALL_PROMOTION";
export const SAVE_GET_ALL_PROMOTION = "SAVE_GET_ALL_PROMOTION";
export const GET_PROMOTION = "GET_PROMOTION";
export const SAVE_GET_PROMOTION = "SAVE_GET_PROMOTION";
export const ADD_PROMOTION = "ADD_PROMOTION";
export const SAVE_ADD_PROMOTION = "SAVE_ADD_PROMOTION";
export const EDIT_PROMOTION = "EDIT_PROMOTION";
export const SAVE_EDIT_PROMOTION = "SAVE_EDIT_PROMOTION";
export const DELETE_PROMOTION = "DELETE_PROMOTION";
export const SAVE_DELETE_PROMOTION = "SAVE_DELETE_PROMOTION";

//Supplier
export const GET_ALL_SUPPLIER = "GET_ALL_SUPPLIER";
export const SAVE_GET_ALL_SUPPLIER = "SAVE_GET_ALL_SUPPLIER";
export const GET_SUPPLIER = "GET_SUPPLIER";
export const SAVE_GET_SUPPLIER = "SAVE_GET_SUPPLIER";
export const ADD_SUPPLIER = "ADD_SUPPLIER";
export const SAVE_ADD_SUPPLIER = "SAVE_ADD_SUPPLIER";
export const EDIT_SUPPLIER = "EDIT_SUPPLIER";
export const SAVE_EDIT_SUPPLIER = "SAVE_EDIT_SUPPLIER";
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";
export const SAVE_DELETE_SUPPLIER = "SAVE_DELETE_SUPPLIER";

//FeedBack
export const GET_ALL_FEEDBACK = "GET_ALL_FEEDBACK";
export const SAVE_GET_ALL_FEEDBACK = "SAVE_GET_ALL_FEEDBACK";

//FAQ
export const GET_ALL_FAQ = "GET_ALL_FAQ";
export const SAVE_GET_ALL_FAQ = "SAVE_GET_ALL_FAQ";
export const GET_FAQ = "GET_FAQ";
export const SAVE_GET_FAQ = "SAVE_GET_FAQ";
export const ADD_FAQ = "ADD_FAQ";
export const SAVE_ADD_FAQ = "SAVE_ADD_FAQ";
export const EDIT_FAQ = "EDIT_FAQ";
export const SAVE_EDIT_FAQ = "SAVE_EDIT_FAQ";
export const DELETE_FAQ = "DELETE_FAQ";
export const SAVE_DELETE_FAQ = "SAVE_DELETE_FAQ";

//Booking
export const GET_ALL_BOOKING = "GET_ALL_BOOKING";
export const SAVE_GET_ALL_BOOKING = "SAVE_GET_ALL_BOOKING";
export const BOOKING_GET_ALL_APARTMENT = "BOOKING_GET_ALL_APARTMENT";
export const BOOKING_GET_ALL_USER = "BOOKING_GET_ALL_USER";
export const ADD_BOOKING = "ADD_BOOKING";
export const SAVE_ADD_BOOKING = "SAVE_ADD_BOOKING";
export const EDIT_BOOKING = "EDIT_BOOKING";
export const SAVE_EDIT_BOOKING = "SAVE_EDIT_BOOKING";
export const DELETE_BOOKING = "DELETE_BOOKING";
export const SAVE_DELETE_BOOKING = "SAVE_DELETE_BOOKING";

//Calendar
export const CALENDAR_VIEW = "CALENDAR_VIEW";
export const CALENDAR_EVENTS = "CALENDAR_EVENTS";
export const CALENDAR_GET_APARTMENT = "CALENDAR_GET_APARTMENT";
export const SAVE_CALENDAR_GET_APARTMENT = "SAVE_CALENDAR_GET_APARTMENT";
export const CALENDAR_GET_USER = "CALENDAR_GET_USER";
export const CALENDAR_GET_BOOKING = "CALENDAR_GET_BOOKING";
export const CALENDAR_ADD_BOOKING = "CALENDAR_ADD_BOOKING";
export const SAVE_CALENDAR_ADD_BOOKING = "SAVE_CALENDAR_ADD_BOOKING";
export const CALENDAR_EDIT_BOOKING = "CALENDAR_EDIT_BOOKING";
export const CALENDAR_DELETE_BOOKING = "CALENDAR_DELETE_BOOKING";
export const CALENDAR_SELECT_APARTMENT = "CALENDAR_SELECT_APARTMENT";
export const CALENDAR_EDIT_APARTMENT = "CALENDAR_EDIT_APARTMENT";
export const SAVE_CALENDAR_EDIT_APARTMENT = "SAVE_CALENDAR_EDIT_APARTMENT";
export const CALENDAR_DELETE_APARTMENT = "CALENDAR_DELETE_APARTMENT";
export const SAVE_CALENDAR_DELETE_APARTMENT = "SAVE_CALENDAR_DELETE_APARTMENT";
