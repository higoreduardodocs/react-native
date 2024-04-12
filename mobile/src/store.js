import { configureStore } from '@reduxjs/toolkit'

import CartReducer from './reducers/cart-slice'
import DeliveryReducer from './reducers/delivery-slice'

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    delivery: DeliveryReducer,
  },
})
