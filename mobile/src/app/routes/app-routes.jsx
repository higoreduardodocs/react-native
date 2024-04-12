import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons'

import * as Screens from '../screens'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const screenOptions = (tabBarLabel, focusedIcon, unFocusedIcon) => ({
  tabBarLabel,
  tabBarStyle: { color: '#008E97' },
  headerShown: false,
  tabBarIcon: ({ focused }) => (focused ? focusedIcon : unFocusedIcon),
})

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="home"
        component={Screens.Home}
        options={screenOptions(
          'Início',
          <Entypo name="home" size={24} color="#008E97" />,
          <AntDesign name="home" size={24} color="black" />
        )}
      />
      <Tab.Screen
        name="profile"
        component={Screens.Profile}
        options={{
          ...screenOptions(
            'Perfil',
            <Ionicons name="person" size={24} color="#008E97" />,
            <Ionicons name="person-outline" size={24} color="black" />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="cart"
        component={Screens.Cart}
        options={screenOptions(
          'Carrinho',
          <AntDesign name="shoppingcart" size={24} color="#008E97" />,
          <AntDesign name="shoppingcart" size={24} color="black" />
        )}
      />
    </Tab.Navigator>
  )
}

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product"
        component={Screens.Product}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="address"
        component={Screens.Address}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-address"
        component={Screens.AddAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="checkout"
        component={Screens.Checkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="order"
        component={Screens.Order}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
