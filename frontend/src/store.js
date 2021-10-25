import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer, productDetailsReducer } from "./reducers/productReducer";
import { authReducer, userReducer, forgotPasswordReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products2: productsReducer,
  productDetails: productDetailsReducer,
  user: authReducer,
  user2: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartIems") ? JSON.parse(localStorage.getItem("cartIems")) : [],
  },
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
