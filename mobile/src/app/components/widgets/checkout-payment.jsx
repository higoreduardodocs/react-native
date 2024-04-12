import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { setPayment } from '../../../reducers/delivery-slice'
import CardSelected from '../ui/card-selected'
import Button from '../ui/button'

export default function CheckoutPayment({ setCurrentStep }) {
  const dispatch = useDispatch()
  const payment = useSelector((state) => state.delivery.payment)

  const setSelected = (item) => dispatch(setPayment(item))

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Selecione seu metodo de pagamento</Text>
      <CardSelected
        selected={payment == 'cash'}
        onPress={() => setSelected('cash')}
      >
        <Text>Pagamento na entrega</Text>
      </CardSelected>
      <CardSelected
        selected={payment == 'card'}
        onPress={() => setSelected('card')}
      >
        <Text>Cartão de crédito ou débito</Text>
      </CardSelected>
      <Button
        onPress={() => setCurrentStep(3)}
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
})
