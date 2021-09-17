import * as PC from "../constants/productConstants";

const initialState = { loading: null, products: [] };

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PC.ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case PC.ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.data,
        productsCount: action.payload.length,
      };

    case PC.ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PC.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
