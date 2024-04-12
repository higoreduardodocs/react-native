import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useEffect, useState } from 'react'
import { BottomModal, SlideAnimation, ModalContent } from 'react-native-modals'
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../../../constants/theme'
import api from '../../../libs/api'
import useUser from '../../../hooks/useUser'
import CardAddress from '../ui/card-address'

export default function HomeModal({ modalVisible, handleModalVisible }) {
  const navigation = useNavigation()
  const { userId } = useUser()
  const [addresses, setAddresses] = useState([])
  const [selected, setSelected] = useState(null)

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
    if (userId) handleAddress()
  }, [userId, modalVisible])

  return (
    <BottomModal
      onBackdropPress={handleModalVisible}
      swipeDirection={['up', 'down']}
      swipeThreshold={200}
      modalAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }
      onHardwareBackPress={handleModalVisible}
      visible={modalVisible}
      onTouchOutside={handleModalVisible}
    >
      <ModalContent style={styles.wrapper}>
        <View style={styles.wrapperTitle}>
          <Text style={styles.title}>Escolha a sua localização</Text>
          <Text style={styles.description}>
            Selecione um local de entrega para ver a disponibilidade do produto
            e as opções de entrega
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={styles.addButton}
            onPress={() => {
              handleModalVisible()
              navigation.navigate('address')
            }}
          >
            <Text style={styles.textAddButton}>
              Adicione um endereço ou ponto de coleta
            </Text>
          </Pressable>
          {addresses?.length > 0 ? (
            addresses.map((item, i) => (
              <CardAddress
                key={i}
                selected={selected}
                item={item}
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
        </ScrollView>
        <View style={styles.wrapperButton}>
          <View style={styles.wrapperIcon}>
            <Entypo name="location-pin" size={22} color={COLORS.blue} />
            <Text style={styles.textButton}>Digitar um CEP</Text>
          </View>
          <View style={styles.wrapperIcon}>
            <Ionicons name="locate-sharp" size={22} color={COLORS.blue} />
            <Text style={styles.textButton}>Usar minha localização atual</Text>
          </View>
          <View style={styles.wrapperIcon}>
            <AntDesign name="earth" size={22} color={COLORS.blue} />
            <Text style={styles.textButton}>Entregar fora do Brasil</Text>
          </View>
        </View>
      </ModalContent>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 400,
  },
  wrapperTitle: { marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '500' },
  description: { marginTop: 5, fontSize: 16, color: COLORS.gray },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  textAddButton: {
    textAlign: 'center',
    color: COLORS.blue,
  },
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
  wrapperButton: {
    flexDirection: 'column',
    gap: 7,
    marginBottom: 10,
  },
  wrapperIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textButton: {
    color: COLORS.blue,
    fontWeight: '400',
  },
})
