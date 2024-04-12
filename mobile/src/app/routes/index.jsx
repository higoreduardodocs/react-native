import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthRoutes from './auth-routes'
import AppRoutes from './app-routes'

const { Navigator, Screen } = createNativeStackNavigator()
const screenOptions = {
  headerShown: false,
  contentStyle: { padding: 0, margin: 0 },
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={screenOptions}>
        <Screen name="auth" component={AuthRoutes} />
        <Screen name="app" component={AppRoutes} />
      </Navigator>
    </NavigationContainer>
  )
}
