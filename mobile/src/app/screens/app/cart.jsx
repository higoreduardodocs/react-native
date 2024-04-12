import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../../reducers/cart-slice'
import { currencyPrice } from '../../../utils/format'
import { COLORS } from '../../../constants/theme'
import HomeSearch from '../../components/widgets/home-search'
import Divider from '../../components/ui/divider'
import Button from '../../components/ui/button'

export default function Cart() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const subAmount = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
  const quantity = cart.reduce((acc, cur) => acc + cur.quantity, 0)

  const increaseQuantity = (item) => dispatch(incrementQuantity(item))
  const decreaseQuantity = (item) => dispatch(decrementQuantity(item))
  const deleteItem = (item) => dispatch(removeFromCart(item))

  return (
    <SafeAreaView>
      <ScrollView>
        <HomeSearch />

        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>SubTotal:</Text>
          <Text style={styles.headingTotal}>
            {currencyPrice.format(subAmount)}
          </Text>
        </View>
        <Text style={{ marginHorizontal: 10 }}>Detalhes disponíveis</Text>

        <Button
          onPress={() => navigation.navigate('checkout')}
          className={{ margin: 10 }}
        >
          <Text>Prossiga para comprar ({quantity}) items</Text>
        </Button>
        <Divider />

        <View style={styles.cartContainer}>
          {cart?.map((item, i) => (
            <View key={i} style={styles.cartItem}>
              <Pressable style={styles.cartButton}>
                <Image source={{ uri: item?.image }} style={styles.cartImage} />

                <View>
                  <Text numberOfLines={3} style={styles.cartTitle}>
                    {item?.title}
                  </Text>
                  <Text style={styles.cartPrice}>
                    {currencyPrice.format(item?.price)}
                  </Text>
                  <View style={styles.cartStock}>
                    <Image
                      source={{
                        uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                      }}
                      style={styles.cartLogo}
                    />
                    <Text style={styles.cartAvailable}>Em estoque</Text>
                  </View>
                </View>
              </Pressable>

              <View style={styles.quantityContainer}>
                <View style={styles.actionContainer}>
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={styles.quantityAction}
                  >
                    <AntDesign
                      name={item?.quantity > 1 ? 'minus' : 'delete'}
                      size={24}
                      color={COLORS.black}
                    />
                  </Pressable>
                  <View style={styles.quantityItem}>
                    <Text>{item?.quantity}</Text>
                  </View>
                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={styles.quantityAction}
                  >
                    <Feather name="plus" size={24} color={COLORS.black} />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={styles.quantityDelete}
                >
                  <Text>Remover</Text>
                </Pressable>
              </View>

              <View style={styles.footerButtonContainer}>
                <Pressable style={styles.footerButton}>
                  <Text>Salvar este produto</Text>
                </Pressable>
                <Pressable style={styles.footerButton}>
                  <Text>Veja mais como este</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headingTitle: {
    fontSize: 18,
    fontWeight: '400',
  },
  headingTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightYellow,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  cartContainer: {
    marginHorizontal: 10,
  },
  cartItem: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: COLORS.lightGray,
  },
  cartButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cartImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  cartTitle: {
    width: 200,
    marginTop: 10,
  },
  cartPrice: {
    fontSize: 20,
    height: 30,
    marginTop: 6,
  },
  cartStock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  cartAvailable: {
    color: COLORS.green,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginHorizontal: 10,
    marginTop: 15,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  quantityAction: {
    padding: 7,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  quantityItem: {
    paddingHorizontal: 18,
  },
  quantityDelete: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: COLORS.lightGray,
    borderWidth: 0.6,
  },
  footerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  footerButton: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 0.6,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGray,
  },
})
