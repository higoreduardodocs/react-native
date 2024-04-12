import { StatusBar } from 'react-native'
import { ModalPortal } from 'react-native-modals'

import { COLORS } from './src/constants/theme'
import DefaultProvider from './src/providers/default-provider'
import Routes from './src/app/routes'

export default function App() {
  return (
    <DefaultProvider>
      <Routes />
      <ModalPortal />
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.dark}
        translucent={true}
      />
    </DefaultProvider>
  )
}
