import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS } from '../../../constants/theme'
import { setAddress } from '../../../reducers/delivery-slice'
import api from '../../../libs/api'
import useUser from '../../../hooks/useUser'
import CardAddress from '../ui/card-address'

export default function CheckoutAddress({ setCurrentStep }) {
  const { userId } = useUser()
  const dispatch = useDispatch()
  const [addresses, setAddresses] = useState([])
  const address = useSelector((state) => state.delivery.address)

  const setSelected = (item) => dispatch(setAddress(item))
  const handleAddress = async () => {
    api
      .get(`/users/addresses/${userId}`)
      .then((res) => setAddresses(res?.data?.addresses))
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha', err?.response?.data?.message)
      })
  }
  useEffect(() => {
    handleAddress()
  }, [])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Selecione o endereço de entrega</Text>

      {addresses?.length > 0 ? (
        addresses.map((item, i) => (
          <CardAddress
            key={i}
            selected={address}
            item={item}
            isCheckoutAddress
            setAddress={() => setCurrentStep(1)}
            onPress={() => setSelected(item)}
          />
        ))
      ) : (
        <Text
          style={{
            ...styles.addressButton,
            borderWidth: 0,
            textAlign: 'center',
          }}
        >
          Sem endereço cadastrado
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 20 },
  title: { fontSize: 16, fontWeight: 'bold' },
  addressButton: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    width: 140,
    height: 140,
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 15,
  },
})
