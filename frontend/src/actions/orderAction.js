import * as OC from "../constants/orderConstants";
import axios from "axios";

export const createOrderAction = (orderdata) => async (dispatch) => {
  try {
    // console.log(orderdata);
    dispatch({ type: OC.CREATE_ORDER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/order/new-order", orderdata, config);

    dispatch({
      type: OC.CREATE_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: OC.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// action to fetch and display all orders placed by loggedIn user
export const myOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: OC.MY_ORDERS_REQUEST });
    const { data } = await axios.get("/api/v1/order/me");

    dispatch({
      type: OC.MY_ORDERS_SUCCESS,
      payload: data.allOrders,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: OC.MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// fetch order details | order id is in params
export const orderDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: OC.ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${id}`);

    setTimeout(() => {
      dispatch({ type: OC.ORDER_DETAILS_SUCCESS, payload: data });
    }, 300);
  } catch (error) {
    console.log(error);
    dispatch({
      type: OC.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: OC.CLEAR_ERRORS });
};
