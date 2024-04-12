import { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

export default function Order() {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('main')
    }, 3000)
  }, [])

  return (
    <SafeAreaView>
      <LottieView
        // ref={animation}
        source={require('../../../../assets/thumbs.json')}
        autoPlay
        loop={false}
        speed={0.7}
        style={styles.congratulations}
      />
      <LottieView
        source={require('../../../../assets/sparkle.json')}
        autoPlay
        loop={false}
        speed={0.7}
        style={styles.congratulationsEffect}
      />
      <Text style={styles.message}>Seu pedido foi recebido</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  congratulations: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
    height: 260,
    width: 300,
  },
  congratulationsEffect: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    height: 300,
    width: 300,
  },
  message: {
    fontSize: 19,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
})
