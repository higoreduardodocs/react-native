import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../../../constants/theme'
import { currencyPrice } from '../../../utils/format'
import { clearCart } from '../../../reducers/cart-slice'
import { clearDelivery } from '../../../reducers/delivery-slice'
import useUser from '../../../hooks/useUser'
import api from '../../../libs/api'
import Button from '../ui/button'

export default function CheckoutOrder() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const { address, payment } = useSelector((state) => state.delivery)
  const { userId } = useUser()
  const subAmount = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
  const shippingFee = 10.99

  const handleOrder = async () => {
    const orderData = {
      userId: userId,
      cartItems: cart,
      totalPrice: subAmount + shippingFee,
      shippingAddress: address,
      paymentMethod: payment,
    }

    api
      .post('/orders', orderData)
      .then((res) => {
        dispatch(clearCart())
        dispatch(clearDelivery())
        navigation.navigate('order')
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha', err?.response?.data?.message)
      })
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Peça agora</Text>

      <Pressable style={styles.offerContainer}>
        <View>
          <Text style={styles.offerTitle}>Economize 5% e nunca acabe</Text>
          <Text style={styles.offerText}>Ative as entregas automáticas</Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={COLORS.black}
        />
      </Pressable>

      <View style={styles.cartOverviewContainer}>
        <Text>Enviando para: ({address?.name})</Text>
        <View style={styles.cartDetail}>
          <Text style={styles.cartDetailItem}>Items</Text>
          <Text style={styles.cartDetailValue}>
            {currencyPrice.format(subAmount)}
          </Text>
        </View>
        <View style={styles.cartDetail}>
          <Text style={styles.cartDetailItem}>Frete</Text>
          <Text style={styles.cartDetailValue}>
            {currencyPrice.format(shippingFee)}
          </Text>
        </View>
        <View style={styles.cartDetail}>
          <Text style={styles.cartDetailItemTotal}>Total de pedidos</Text>
          <Text style={styles.cartDetailValueTotal}>
            {currencyPrice.format(subAmount + shippingFee)}
          </Text>
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Pagar com</Text>
        <Text style={styles.paymentText}>{payment}</Text>
      </View>

      <Button
        className={{ marginTop: 10, borderRadius: 20 }}
        onPress={handleOrder}
      >
        <Text>Faça seu pedido</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 20 },
  title: { fontSize: 16, fontWeight: 'bold' },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: 8,
    marginTop: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  offerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  offerText: {
    fontSize: 15,
    color: COLORS.gray,
    marginTop: 5,
  },
  cartOverviewContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginTop: 10,
    padding: 8,
  },
  cartDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cartDetailItem: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.mediumGray,
  },
  cartDetailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  cartDetailItemTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartDetailValueTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.red,
  },
  paymentContainer: {
    marginTop: 10,
    padding: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  paymentTitle: {
    fontSize: 16,
    color: COLORS.mediumGray,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 7,
  },
})
