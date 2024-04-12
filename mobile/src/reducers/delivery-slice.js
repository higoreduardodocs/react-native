import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: null,
  delivery: null,
  payment: null,
}

export const DeliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload
    },
    setPayment: (state, action) => {
      state.payment = action.payload
    },
    clearDelivery: (state) => {
      state.address = null
      state.delivery = null
      state.payment = null
    },
  },
})

export const { setAddress, setDelivery, setPayment, clearDelivery } =
  DeliverySlice.actions

export default DeliverySlice.reducer
