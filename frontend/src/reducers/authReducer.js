import * as AC from "../constants/authConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AC.LOGIN_REQUEST:
    case AC.REGISTER_USER_REQUEST:
    case AC.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case AC.LOGIN_SUCCESS:
    case AC.REGISTER_USER_SUCCESS:
    case AC.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case AC.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case AC.LOGIN_FAIL:
    case AC.REGISTER_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case AC.LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case AC.LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case AC.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case AC.UPDATE_PROFILE_REQUEST:
    case AC.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AC.UPDATE_PROFILE_SUCCESS:
    case AC.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case AC.UPDATE_PROFILE_FAIL:
    case AC.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AC.UPDATE_PROFILE_RESET:
    case AC.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case AC.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case AC.FORGOT_PASSWORD_REQUEST:
    case AC.SET_NEW_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AC.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case AC.SET_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case AC.FORGOT_PASSWORD_FAIL:
    case AC.SET_NEW_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AC.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
