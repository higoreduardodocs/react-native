import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'

import { COLORS } from '../../../constants/theme'
import Button from './button'

export default function CardAddress({
  selected,
  item,
  isCheckoutAddress = false,
  setAddress,
  ...props
}) {
  return (
    <View>
      <Pressable
        style={{
          ...styles.addressButton(isCheckoutAddress),
          backgroundColor:
            !isCheckoutAddress && selected === item
              ? COLORS.lightOrange
              : COLORS.white,
        }}
        {...props}
      >
        {isCheckoutAddress &&
          (selected === item ? (
            <FontAwesome5 name="dot-circle" size={20} color={COLORS.green} />
          ) : (
            <Entypo name="circle" size={20} color={COLORS.gray} />
          ))}
        <View style={{ marginLeft: isCheckoutAddress && 6 }}>
          <View style={styles.wrapperName}>
            <Text style={styles.addressName}>{item?.name}</Text>
            <Entypo name="location-pin" size={24} color={COLORS.red} />
          </View>
          <Text numberOfLines={1} style={styles.addressItem}>
            {item?.houseNo}, {item?.landmark}
          </Text>
          <Text numberOfLines={1} style={styles.addressItem}>
            {item?.street}
          </Text>
          <Text numberOfLines={1} style={styles.addressItem}>
            {item?.city}, {item?.state}
          </Text>
        </View>
      </Pressable>
      {isCheckoutAddress && selected === item && (
        <Button
          className={{ marginTop: 10, borderRadius: 20 }}
          onPress={setAddress}
        >
          <Text style={styles.buttonDelivery}>Entregue neste endereço</Text>
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  addressButton: (isCheckoutAddress) => ({
    flexDirection: 'row',
    justifyContent: isCheckoutAddress ? 'flex-start' : 'center',
    alignItems: 'center',
    gap: 3,
    width: isCheckoutAddress ? '100%' : 140,
    height: 140,
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: isCheckoutAddress ? 0 : 10,
  }),
  wrapperName: {
    flexDirection: 'row',
    gap: 3,
  },
  addressName: { fontSize: 13, fontWeight: 'bold' },
  addressItem: {
    fontSize: 15,
    color: COLORS.darkGray,
  },
  buttonDelivery: {
    textAlign: 'center',
    color: COLORS.white,
  },
})
