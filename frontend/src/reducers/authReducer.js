import * as AC from "../constants/authConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AC.LOGIN_REQUEST:
      return {
        loading: true,
        isAuthehticated: false,
      };

    case AC.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthehticated: true,
        user: action.payload,
      };

    case AC.LOGIN_FAIL:
      return {
        loading: false,
        isAuthehticated: false,
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
