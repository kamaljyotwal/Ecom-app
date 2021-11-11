import * as CC from "../constants/cartConstants";

const initialState = { cartItems: [], shippingInfo: {} };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CC.ADD_TO_CART:
      const isItemExist = state.cartItems.find((i) => i.productId === action.payload.productId);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.productId === isItemExist.productId ? action.payload : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case CC.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case CC.EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    case CC.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
