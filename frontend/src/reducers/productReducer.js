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
        productsCount: action.payload.productsCount,
        allProductsCount: action.payload.allProductsCount,
        resPerPage: action.payload.resPerPage,
        products: action.payload.data,
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PC.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PC.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PC.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PC.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// new review reducer
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PC.NEW_REVIEW_REQUEST:
      return { ...state, loading: true };

    case PC.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case PC.NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: "some error occured",
      };
    case PC.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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
