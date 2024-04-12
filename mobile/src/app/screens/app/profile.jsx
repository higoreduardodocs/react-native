import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useCallback, useLayoutEffect, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS } from '../../../constants/theme'
import api from '../../../libs/api'
import useUser from '../../../hooks/useUser'
import Button from '../../components/ui/button'

export default function Profile() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const { userId, setUserId } = useUser()

  const handleUser = async () => {
    api
      .get(`/users/${userId}`)
      .then((res) => setUser(res?.data))
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha', err?.response?.data?.message)
      })
  }
  const handleOrders = async () => {
    setLoading(true)
    api
      .get(`/orders/${userId}`)
      .then((res) => setOrders(res?.data))
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha', err?.response?.data?.message)
      })
      .finally(() => setLoading(false))
  }
  const logout = async () => {
    await AsyncStorage.removeItem('token')
    setUserId(null)
    navigation.replace('auth')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: { backgroundColor: COLORS.green },
      headerLeft: () => (
        <Image
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
          style={styles.headerLeftImage}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.black}
          />
          <AntDesign name="search1" size={24} color={COLORS.black} />
        </View>
      ),
    })
  }, [])
  useFocusEffect(
    useCallback(() => {
      handleUser()
      handleOrders()
    }, [])
  )

  return (
    <ScrollView>
      <Text style={styles.nameTitle}>Bem vindo {user?.name}</Text>
      <View style={styles.buttonGroup}>
        <Button className={styles.button}>
          <Text style={{ textAlign: 'center' }}>Seus pedidos</Text>
        </Button>
        <Button className={styles.button}>
          <Text style={{ textAlign: 'center' }}>Sua conta</Text>
        </Button>
      </View>
      <View style={styles.buttonGroup}>
        <Button className={styles.button}>
          <Text style={{ textAlign: 'center' }}>Comprar novamente</Text>
        </Button>
        <Button className={styles.button} onPress={logout}>
          <Text style={{ textAlign: 'center' }}>Sair</Text>
        </Button>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Pesquisando...</Text>
        ) : orders.length > 0 ? (
          orders.map((item, i) => (
            <Pressable key={i} style={styles.orderContainer}>
              {item.products.slice(0, 1)?.map((value, key) => (
                <View key={key} style={styles.productWrapper}>
                  <Image
                    source={{ uri: value.image }}
                    style={styles.productImage}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>Nenhum pedido encontrado</Text>
        )}
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerLeftImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginLeft: 12,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 12,
  },
  nameTitle: { fontSize: 16, fontWeight: 'bold' },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    marginHorizontal: 12,
  },
  button: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: COLORS.gray,
  },
  orderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.mediumGray,
    marginHorizontal: 10,
  },
  productWrapper: {
    marginVertical: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
})
