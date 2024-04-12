import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../reducers/cart-slice'

import { COLORS } from '../../../constants/theme'
import { currencyPrice } from '../../../utils/format'
import HomeSearch from '../../components/widgets/home-search'
import Divider from '../../components/ui/divider'

export default function Product() {
  const route = useRoute()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const { width } = Dimensions.get('window')
  const height = (width * 100) / 100
  const handleCart = () => {
    dispatch(addToCart(route?.params?.product))
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <HomeSearch />
        {/* IMAGES */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route?.params?.carouselImages.map((item, i) => (
            <ImageBackground
              key={i}
              style={{ width, height, resizeMode: 'contain' }}
              source={{ uri: item }}
            >
              {i === 0 && (
                <>
                  <View style={styles.iconContainer}>
                    <View
                      style={{
                        ...styles.iconWrapper,
                        backgroundColor: COLORS.darkRed,
                      }}
                    >
                      <Text style={styles.offerText}>20% Off</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                      <MaterialCommunityIcons
                        name="share-variant"
                        size={24}
                        color={COLORS.black}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      ...styles.iconWrapper,
                      marginTop: 'auto',
                      marginLeft: 20,
                      marginBottom: 20,
                    }}
                  >
                    <AntDesign name="hearto" size={24} color={COLORS.black} />
                  </View>
                </>
              )}
            </ImageBackground>
          ))}
        </ScrollView>
        {/* DESCRIPTION */}
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>{route?.params?.title}</Text>
          <Text style={styles.price}>
            {currencyPrice.format(route?.params?.price)}
          </Text>
        </View>
        <Divider />
        <View style={styles.descriptionContainer}>
          <Text>Cor:</Text>
          <Text style={styles.descriptionDetail}>{route?.params?.color}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>Tamanho:</Text>
          <Text style={styles.descriptionDetail}>{route?.params?.size}</Text>
        </View>
        <Divider />
        <View style={{ padding: 10 }}>
          <Text style={styles.descriptionDetail}>
            Total: {currencyPrice.format(route?.params?.price)}
          </Text>
          <Text style={{ color: COLORS.green }}>Envio rápido até 15h</Text>
          <View style={styles.deliverContainer}>
            <Ionicons name="location" size={24} color={COLORS.black} />
            <Text style={styles.descriptionDetail}>
              Enviar para John Doe - Rua
            </Text>
          </View>
        </View>
        <Text style={styles.inStock}>Pronta entrega</Text>
        <Pressable style={styles.cartButton} onPress={handleCart}>
          <Text>
            {cart.findIndex((item) => item.id === route?.params?.product?.id) >=
            0
              ? 'Adicionado ao carrinho'
              : 'Adicionar ao carrinho'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  offerText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.white,
  },
  title: { fontSize: 15, fontWeight: '500' },
  price: { fontSize: 18, fontWeight: '600' },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    padding: 10,
  },
  descriptionDetail: { fontSize: 15, fontWeight: '500' },
  deliverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inStock: {
    color: COLORS.green,
    marginHorizontal: 10,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  cartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightYellow,
  },
})
