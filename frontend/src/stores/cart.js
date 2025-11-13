import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items:localStorage.getItem("carts") ? JSON.parse(localStorage.getItem('carts')) : [],
  total: localStorage.getItem("total") ? localStorage.getItem("total") : 0,
}

const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToCart(state,action){
      const {productId, quantity,name,image,price} = action.payload;
      const indexProductId = (state.items).findIndex(item => item.productId === productId);

      if(indexProductId >= 0){
        state.items[indexProductId].quantity += quantity;
      }else{
        state.items.push({productId, quantity,name,image,price});

      }
        state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      localStorage.setItem("carts",JSON.stringify(state.items));
      localStorage.setItem("total",state.total);
    },
    changeQuantity(state,action){
      const {productId, quantity} = action.payload;
      const indexProductId = (state.items).findIndex(item => item.productId === productId);
      if(quantity > 0){
        state.items[indexProductId].quantity = quantity;
      }else{
        // delete state.items[indexProductId];
        state.items = (state.items).filter(item => item.productId === productId);
      }
        state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      localStorage.setItem("carts",JSON.stringify(state.items));
      localStorage.setItem("total",state.total);
    },
    DeleteItem(state,action){
      const {productId} = action.payload;
      state.items = (state.items).filter(item => item.productId === productId);
        state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      localStorage.setItem("carts",JSON.stringify(state.items));
      localStorage.setItem("total",state.total);
    },
    ClearItems(state){
      state.items = [];
      state.total = 0;
      localStorage.setItem("carts",JSON.stringify(state.items));
      localStorage.setItem("total",state.total);
    }
  }
  
})

export const {addToCart,changeQuantity,DeleteItem, ClearItems} = cartSlice.actions;
export default cartSlice.reducer;