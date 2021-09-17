import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer } from "./reducers/productReducer";

const reducer = combineReducers({
  products2: productsReducer,
});

let initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
