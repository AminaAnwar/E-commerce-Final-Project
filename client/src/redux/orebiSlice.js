import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  order: null
};

export const fetchCartList = createAsyncThunk('product/fetchCartList', async() => {
  const response = await fetch(`http://localhost:8081/api/front/cart/list`, {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
  })
  return response.json()
})

export const placeOrder = createAsyncThunk('product/placeOrder', async(body) => {
  const response = await fetch(`http://localhost:8081/api/front/order/placeOrder`, {
      method: "POST",
      headers: {
          'Content-Type': "application/json"
      },
      body: JSON.stringify(body)
  })
  return response.json()
})


export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    resetState: (state) => {
      state.userInfo = [];
      state.products = [];
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase('fetchCartList', (state, action) => {
      })
      .addCase(placeOrder.fulfilled, (state,action)=> {
        state.order = action.payload
      })
  }
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetState,
  resetCart,
} = orebiSlice.actions;
export default orebiSlice.reducer;
