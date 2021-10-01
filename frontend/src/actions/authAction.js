import * as AC from "../constants/authConstants";
import axios from "axios";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: AC.LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/login", { email, password }, config);
    console.log(data);

    setTimeout(() => {
      dispatch({ type: AC.LOGIN_SUCCESS, payload: data.data });
    }, 1000);
  } catch (error) {
    console.log(error.response.data.message);
    setTimeout(() => {
      dispatch({ type: AC.LOGIN_FAIL, payload: error.response.data.message });
    }, 600);
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: AC.CLEAR_ERRORS,
  });
};
