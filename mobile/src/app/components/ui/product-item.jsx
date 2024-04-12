import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import { COLORS } from '../../../constants/theme'
import { addToCart } from '../../../reducers/cart-slice'
import { currencyPrice } from '../../../utils/format'

export default function ProductItem({ product }) {
  const dispatch = useDispatch()
  const handleCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <Pressable>
      <Image source={{ uri: product?.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {product?.title}
      </Text>
      <View style={styles.description}>
        <Text style={styles.price}>{currencyPrice.format(product?.price)}</Text>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={16} color={COLORS.lightYellow} />
          <Text style={styles.rating}>{product?.rating?.rate}</Text>
        </View>
      </View>
      <Pressable style={styles.cartButton} onPress={handleCart}>
        <Text>Adicionar</Text>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    width: 150,
    marginTop: 10,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rating: {
    color: COLORS.lightYellow,
    fontWeight: 'bold',
  },
  cartButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightYellow,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
  },
})
