import combinedReducer from "../reducers/combinedReducer";
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from "@reduxjs/toolkit";

export default createStore(combinedReducer, applyMiddleware(reduxThunk));