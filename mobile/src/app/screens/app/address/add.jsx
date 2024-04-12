import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../../../../constants/theme'
import FormAddress from '../../../components/forms/app/address'

export default function Add() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.banner} />
        <Text style={styles.title}>Adicionar endereço</Text>
        <FormAddress />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 50,
    backgroundColor: COLORS.green,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    padding: 10,
  },
})
