import 'core-js/stable/atob'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { jwtDecode } from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS } from '../../../../constants/theme'
import api from '../../../../libs/api'
import useUser from '../../../../hooks/useUser'
import InputText from '../../ui/inputs/text'

export default function Auth({ action, isNonLogin }) {
  const navigate = useNavigation()
  const { setUserId } = useUser()
  const [auth, setAuth] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleAuth = (name, value) =>
    setAuth((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  const handleSubmit = async () => {
    const endpoint = isNonLogin ? '/auth/save' : '/auth/login'
    if (!isNonLogin) delete auth.name
    api
      .post(endpoint, auth)
      .then(async (res) => {
        if (!isNonLogin) {
          const token = res?.data?.token
          const decoded = token ? jwtDecode(token) : ''
          await AsyncStorage.setItem('token', token)
          setUserId(decoded.id)
          navigate.replace('app')
        }
        setAuth({ name: '', email: '', password: '' })
        Alert.alert('Sucesso', res?.data?.message)
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha', err?.response?.data?.message)
      })
  }
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const decoded = token ? jwtDecode(token) : ''
        setUserId(decoded.id)
        if (token) navigate.replace('app')
      } catch (error) {
        console.log(error)
      }
    }
    checkToken()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <KeyboardAvoidingView>
      {isNonLogin && (
        <InputText
          placeholder="Insira seu nome"
          onChangeText={(text) => handleAuth('name', text)}
        >
          <FontAwesome name="user" size={24} color="gray" />
        </InputText>
      )}
      <InputText
        placeholder="Insira seu email"
        onChangeText={(text) => handleAuth('email', text)}
      >
        <MaterialIcons name="email" size={24} color="gray" />
      </InputText>
      <InputText
        placeholder="Insira sua senha"
        secureTextEntry={true}
        onChangeText={(text) => handleAuth('password', text)}
      >
        <FontAwesome name="lock" size={24} color="gray" />
      </InputText>
      {!isNonLogin && (
        <View style={styles.wrapperButtons}>
          <Text>Manter logado</Text>
          <Text style={styles.forgetButton}>Esqueci a senha</Text>
        </View>
      )}
      <View style={{ marginTop: 70 }}>
        <Pressable style={styles.authButton} onPress={handleSubmit}>
          <Text style={styles.textAuthButton}>{action}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapperButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  forgetButton: {
    color: COLORS.blue,
    fontWeight: '500',
  },
  authButton: {
    width: 200,
    backgroundColor: COLORS.yellow,
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  },
  textAuthButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
