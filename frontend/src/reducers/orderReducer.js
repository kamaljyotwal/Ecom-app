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

export const myOrdersReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case OC.MY_ORDERS_REQUEST:
      return { ...state, loading: true };

    case OC.MY_ORDERS_SUCCESS:
      return { loading: false, orders: payload };

    case OC.MY_ORDERS_FAIL:
      return { loading: false, error: payload };

    case OC.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, { type, payload }) => {
  switch (type) {
    case OC.ORDER_DETAILS_REQUEST:
      return { loading: true };

    case OC.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: payload };

    case OC.ORDER_DETAILS_FAIL:
      return { loading: false, error: payload };

    case OC.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
