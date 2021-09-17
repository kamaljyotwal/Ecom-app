import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const getProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/v1/products");

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_PRODUCTS_FAIL, payload: "some Error" });
  }
};
