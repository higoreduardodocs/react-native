import { Provider } from 'react-redux'

import { store } from '../store'
import UserContextProvider from '../contexts/user-context'

export default function DefaultProvider({ children }) {
  return (
    <UserContextProvider>
      <Provider store={store}>{children}</Provider>
    </UserContextProvider>
  )
}
