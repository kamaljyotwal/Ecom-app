import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
} from "./reducers/productReducer";
import { authReducer, userReducer, forgotPasswordReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";
import { newOrderReducer, orderDetailsReducer, myOrdersReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products2: productsReducer,
  productDetails: productDetailsReducer,
  user: authReducer,
  user2: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
