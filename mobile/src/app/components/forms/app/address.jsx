import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../../../../constants/theme'
import api from '../../../../libs/api'
import useUser from '../../../../hooks/useUser'
import TextLabel from '../../ui/inputs/text-label'

const initialState = {
  country: '',
  state: '',
  city: '',
  name: '',
  mobileNo: '',
  houseNo: '',
  street: '',
  neighborhood: '',
  landmark: '',
  postalCode: '',
}

export default function Address() {
  const { userId } = useUser()
  const navigation = useNavigation()
  const [address, setAddress] = useState(initialState)
  const handleAddress = (name, value) =>
    setAddress((prevState) => ({ ...prevState, [name]: value }))
  const handleSubmit = async () => {
    api
      .post('/users/addresses', { id: userId, address })
      .then((res) => {
        setAddress(initialState)
        Alert.alert('Sucesso', res?.data?.message)
        navigation.goBack()
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha', err?.response?.data?.message)
      })
  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.wrapperInputs}>
        <TextLabel
          label="País"
          placeholder="Ex.: Brasil"
          onChangeText={(text) => handleAddress('country', text)}
        />
        <TextLabel
          label="Estado"
          placeholder="Ex.: SP"
          onChangeText={(text) => handleAddress('state', text)}
        />
        <TextLabel
          label="Cidade"
          placeholder="Ex.: São Paulo"
          onChangeText={(text) => handleAddress('city', text)}
        />
        <TextLabel
          label="Nome completo"
          placeholder="Ex.: John Doe"
          onChangeText={(text) => handleAddress('name', text)}
        />
        <TextLabel
          label="WhatsApp"
          placeholder="Ex.: (11) 9 9999-9999"
          onChangeText={(text) => handleAddress('mobileNo', text)}
        />
        <TextLabel
          label="Número endereço"
          placeholder="Ex.: 209"
          onChangeText={(text) => handleAddress('houseNo', text)}
        />
        <TextLabel
          label="Nome rua"
          placeholder="Ex.: Tiradentes"
          onChangeText={(text) => handleAddress('street', text)}
        />
        <TextLabel
          label="Bairro"
          placeholder="Ex.: Centro"
          onChangeText={(text) => handleAddress('neighborhood', text)}
        />
        <TextLabel
          label="Referência"
          placeholder="Ex.: Perto do banco Itaú"
          onChangeText={(text) => handleAddress('landmark', text)}
        />
        <TextLabel
          label="CEP"
          placeholder="Ex.: 12890-098"
          onChangeText={(text) => handleAddress('postalCode', text)}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={{ fontWeight: 'bold' }}>Adicionar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapperInputs: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.lightYellow,
  },
})
