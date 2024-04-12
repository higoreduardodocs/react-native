import { StyleSheet, Text, View } from 'react-native'

import { checkoutSteps } from '../../../utils/mock'
import { COLORS } from '../../../constants/theme'

export default function CheckoutHeading({ currentStep }) {
  return (
    <View style={styles.wrapper}>
      {checkoutSteps.map((item, i) => (
        <View style={styles.stepItem} key={i}>
          <View style={styles.progressBar(i, currentStep)} />
          <View style={styles.bulletContainer(i, currentStep)}>
            {i < currentStep ? (
              <Text style={styles.bullet}>&#10003;</Text>
            ) : (
              <Text style={styles.bullet}>{i + 1}</Text>
            )}
          </View>
          <Text style={styles.title(i, currentStep)}>{item.title}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 20,
  },
  stepItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: (index, currentStep) => ({
    height: 2,
    width: 30,
    backgroundColor: index <= currentStep ? COLORS.green : COLORS.gray,
  }),
  bulletContainer: (index, currentStep) => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: index <= currentStep ? COLORS.green : COLORS.gray,
    marginVertical: 5,
  }),
  bullet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  title: (index, currentStep) => ({
    textAlign: 'center',
    fontWeight: 'bold',
    color: index <= currentStep ? COLORS.black : COLORS.gray,
  }),
})
