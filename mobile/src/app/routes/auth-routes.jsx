import { createNativeStackNavigator } from '@react-navigation/native-stack'

import * as Screens from '../screens'

const { Navigator, Screen } = createNativeStackNavigator()

export default function AuthRoutes() {
  return (
    <Navigator initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Screen name="index" component={Screens.Auth} />
    </Navigator>
  )
}
