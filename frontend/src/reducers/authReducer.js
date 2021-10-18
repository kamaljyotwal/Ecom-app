import * as AC from "../constants/authConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AC.LOGIN_REQUEST:
    case AC.REGISTER_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case AC.LOGIN_SUCCESS:
    case AC.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case AC.LOGIN_FAIL:
    case AC.REGISTER_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
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
