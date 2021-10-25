import * as CC from "../constants/cartConstants";
import axios from "axios";

// addtoCart action
export const addItemToCartAction = (productId, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${productId}`);

  dispatch({
    type: CC.ADD_TO_CART,
    payload: {
      product: data.data._id,
      name: data.data.name,
      price: data.data.price,
      image: data.data.images[0].url,
      stock: data.data.stock,
      quantity,
    },
  });
  localStorage.setItem("cartIems", JSON.stringify(getState().cart.cartItems));
};

// remove item from cart action
export const removeItemFromCartAction = (productId) => async (dispatch, getState) => {
  const filtered = getState().cart.cartItems.filter((i) => i.product !== productId);

  dispatch({ type: CC.REMOVE_ITEM_FROM_CART, payload: filtered });

  localStorage.setItem("cartIems", JSON.stringify(filtered));
};
