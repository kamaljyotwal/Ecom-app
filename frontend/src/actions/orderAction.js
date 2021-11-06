import * as OC from "../constants/orderConstants";
import axios from "axios";

export const createOrderAction = (orderdata) => async (dispatch, getState) => {
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

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: OC.CLEAR_ERRORS,
  });
};
