import * as PC from "../constants/productConstants";
import axios from "axios";

export const getProductsAction = (currentPg) => async (dispatch) => {
  try {
    dispatch({ type: PC.ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get(`/api/v1/products?page=${currentPg}`);

    dispatch({ type: PC.ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PC.ALL_PRODUCTS_FAIL, payload: error.message });
  }
};

export const getProductDetailsAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PC.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    // console.log(message);
    dispatch({ type: PC.PRODUCT_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: PC.PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

// // Clear Errors
// export const clearErrors = () => async (dispatch) => {
//   dispatch({ type: PC.CLEAR_ERRORS });
// };
