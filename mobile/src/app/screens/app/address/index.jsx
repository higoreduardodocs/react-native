import { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet, Text, Pressable, Alert } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { COLORS } from '../../../../constants/theme'
import api from '../../../../libs/api'
import useUser from '../../../../hooks/useUser'
import HomeSearch from '../../../components/widgets/home-search'

export default function Address() {
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
  useFocusEffect(
    useCallback(() => {
      handleAddress()
    }, [])
  )

  return (
    <SafeAreaView>
      <HomeSearch />

      <View style={{ padding: 10 }}>
        <Text style={styles.title}>Seus endereços</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('add-address')}
        >
          <Text>Adicionar endereço</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={COLORS.black}
          />
        </Pressable>
        {addresses?.length > 0 ? (
          addresses.map((item, i) => (
            <Pressable
              key={i}
              style={{
                ...styles.addressButton,
                backgroundColor:
                  selected === item ? COLORS.lightOrange : COLORS.white,
              }}
              onPress={() => setSelected(item)}
            >
              <View style={styles.wrapperName}>
                <Text style={styles.addressName}>{item?.name}</Text>
                <Entypo name="location-pin" size={24} color={COLORS.red} />
              </View>
              <Text style={styles.addressItem}>
                {item?.houseNo}, {item?.landmark}
              </Text>
              <Text style={styles.addressItem}>{item?.neighborhood}</Text>
              <Text style={styles.addressItem}>{item?.street}</Text>
              <Text style={styles.addressItem}>
                {item?.city}, {item?.state}
              </Text>
              <Text style={styles.addressItem}>Contato: {item?.mobileNo}</Text>
              <Text style={styles.addressItem}>CEP: {item?.postalCode}</Text>
              <View style={styles.wrapperButton}>
                <Pressable style={styles.addressEdit(selected === item)}>
                  <Text>Editar</Text>
                </Pressable>
                <Pressable style={styles.addressEdit(selected === item)}>
                  <Text>Remover</Text>
                </Pressable>
                <Pressable style={styles.addressEdit(selected === item)}>
                  <Text>Definir como padrão</Text>
                </Pressable>
              </View>
            </Pressable>
          ))
        ) : (
          <Text>Sem endereço cadastrado</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  addressButton: {
    flexDirection: 'column',
    gap: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 10,
  },
  wrapperName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  addressName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  addressItem: {
    fontSize: 15,
    color: COLORS.darkGray,
  },
  wrapperButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },
  addressEdit: (isSelected) => ({
    borderColor: isSelected ? COLORS.white : COLORS.gray,
    borderWidth: 0.9,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  }),
})
