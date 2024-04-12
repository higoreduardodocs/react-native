import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const finded = state.cart.find((item) => item.id === action.payload.id)
      if (finded) finded.quantity++
      else state.cart.push({ ...action.payload, quantity: 1 })
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
    },
    incrementQuantity: (state, action) => {
      const finded = state.cart.find((item) => item.id === action.payload.id)
      finded.quantity++
    },
    decrementQuantity: (state, action) => {
      const finded = state.cart.find((item) => item.id === action.payload.id)
      if (finded.quantity === 1)
        state.cart = state.cart.filter((item) => item.id !== action.payload.id)
      else finded.quantity--
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = CartSlice.actions

export default CartSlice.reducer
