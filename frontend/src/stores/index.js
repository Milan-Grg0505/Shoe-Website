import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cart.js';


export const store = configureStore({
  reducer :{
    cart:cardReducer,
    // user : ...
    
  }
})