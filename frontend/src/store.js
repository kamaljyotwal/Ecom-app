import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer, productDetailsReducer } from "./reducers/productReducer";
import { authReducer, userReducer, forgotPasswordReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  products2: productsReducer,
  productDetails: productDetailsReducer,
  user: authReducer,
  user2: userReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
