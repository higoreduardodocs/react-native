import { useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CheckoutHeading from '../../components/ui/checkout-heading'
import CheckoutAddress from '../../components/widgets/checkout-address'
import CheckoutDelivery from '../../components/widgets/checkout-delivery'
import CheckoutPayment from '../../components/widgets/checkout-payment'
import CheckoutOrder from '../../components/widgets/checkout-order'

const SwitchStep = ({ currentStep, setCurrentStep }) => {
  switch (currentStep) {
    case 0:
      return <CheckoutAddress setCurrentStep={setCurrentStep} />
    case 1:
      return <CheckoutDelivery setCurrentStep={setCurrentStep} />
    case 2:
      return <CheckoutPayment setCurrentStep={setCurrentStep} />
    case 3:
      return <CheckoutOrder />
    default:
      return null
  }
}

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <SafeAreaView>
      <ScrollView>
        <CheckoutHeading currentStep={currentStep} />
        <SwitchStep currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </ScrollView>
    </SafeAreaView>
  )
}
