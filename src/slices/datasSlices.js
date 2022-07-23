import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   order: [],
   orders: [],
   products: [],
   customers: [],
   comments: [],
   history: null,
};

const orderSlice = createSlice({
   name: "datas",
   initialState,
   reducers: {

      setAllOrders(state, action) {
         state.orders = action.payload;
      },

      setAllProducts(state, action) {
         state.products = action.payload;
      },

      setAllCustomers(state, action) {
         state.customers = action.payload;
      },

      setAllComments(state, action) {
         state.comments = action.payload;
      },

      getOrder(state, action) {
         state.order = [];
         state.order = action.payload;
      },

      saveDetail(state, action) {
         state.history = action.payload;
      },

      removeComment(state, action) {
         const nextCartAfterDelete = state.comments.filter(item => item.id !== action.payload.id);
         state.comments = nextCartAfterDelete;
      },

      removeProduct(state, action) {
         const nextCartAfterDelete = state.products.filter(item => item.id !== action.payload.id);
         state.products = nextCartAfterDelete;
      },
   }
});


export const { setAllOrders, setAllComments, setAllCustomers, setAllProducts, getOrder, saveDetail, removeComment, removeProduct } = orderSlice.actions;

export default orderSlice.reducer;