import * as OC from "../constants/orderConstants";

const initialState = {};

export const newOrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OC.CREATE_ORDER_REQUEST:
      return { ...state, loading: true };

    case OC.CREATE_ORDER_SUCCESS:
      return { loading: false, order: payload };

    case OC.CREATE_ORDER_FAIL:
      return { loading: false, error: payload };

    case OC.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
