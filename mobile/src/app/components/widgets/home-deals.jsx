import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { homeDeals, homeOffers } from '../../../utils/mock'
import { COLORS } from '../../../constants/theme'
import Heading from '../ui/heading'
import Divider from '../ui/divider'

export default function HomeDeals() {
  const navigation = useNavigation()

  return (
    <>
      <Heading>Tendências de ofertas da semana</Heading>
      <View style={styles.dealsContainer}>
        {homeDeals.map((item, i) => (
          <Pressable
            key={i}
            style={styles.dealsItem(false)}
            onPress={() =>
              navigation.navigate('product', { ...item, product: item })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.dealsImage(false)}
            />
          </Pressable>
        ))}
      </View>
      <Divider />
      <Heading>Ofertas do Dia</Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {homeOffers.map((item, i) => (
          <Pressable
            key={i}
            style={styles.dealsItem(true)}
            onPress={() =>
              navigation.navigate('product', { ...item, product: item })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.dealsImage(true)}
            />
            <View style={styles.dealsOffer}>
              <Text style={styles.dealsOfferText}>Até {item?.offer}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Divider />
    </>
  )
}

const styles = StyleSheet.create({
  dealsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  dealsItem: (isColumn) => ({
    flexDirection: isColumn ? 'column' : 'row',
    alignItems: 'center',
    marginVertical: 10,
  }),
  dealsImage: (isSmall) => ({
    height: isSmall ? 150 : 180,
    width: isSmall ? 150 : 180,
    resizeMode: 'contain',
  }),
  dealsOffer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: COLORS.red,
    paddingVertical: 5,
    width: 130,
  },
  dealsOfferText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
})
