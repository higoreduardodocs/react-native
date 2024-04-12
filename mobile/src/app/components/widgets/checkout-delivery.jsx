import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS } from '../../../constants/theme'
import Button from '../ui/button'
import CardSelected from '../ui/card-selected'
import { setDelivery } from '../../../reducers/delivery-slice'

export default function CheckoutDelivery({ setCurrentStep }) {
  const dispatch = useDispatch()
  const delivery = useSelector((state) => state.delivery.delivery)

  const setSelected = () => dispatch(setDelivery(true))

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Escolha suas opções de entrega</Text>
      <CardSelected selected={delivery} onPress={setSelected}>
        <Text style={styles.shipping}>
          Entrega GRATUITA com sua assinatura Prime
        </Text>
      </CardSelected>

      <Button
        onPress={() => setCurrentStep(2)}
        className={{ marginTop: 10, borderRadius: 20 }}
      >
        <Text>Continue</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 20 },
  title: { fontSize: 16, fontWeight: 'bold' },
  shipping: {
    color: COLORS.green,
    fontWeight: '500',
  },
})
