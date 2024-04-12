import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'

import { COLORS } from '../../../constants/theme'
import FormAuth from '../../components/forms/auth'

export default function Auth() {
  const [isNonLogin, setIsNonLogin] = useState(false)

  const title = isNonLogin ? 'Criar minha conta' : 'Acessar minha conta'
  const action = isNonLogin ? 'Criar' : 'Login'
  const footer = isNonLogin ? 'Já possui uma conta?' : 'Não possui uma conta?'

  const toggleLogin = () => setIsNonLogin((prevState) => !prevState)

  return (
    <SafeAreaView style={styles.wrapper}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
        }}
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>{title}</Text>
        <FormAuth action={action} isNonLogin={isNonLogin} />
        <Pressable onPress={toggleLogin} style={{ marginTop: 15 }}>
          <Text style={styles.textFooterButton}>{footer}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: COLORS.dark,
  },
  textFooterButton: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
})
