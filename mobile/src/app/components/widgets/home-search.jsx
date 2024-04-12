import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'

import { COLORS } from '../../../constants/theme'

export default function HomeSearch() {
  return (
    <View style={styles.searchContainer}>
      <Pressable style={styles.search}>
        <AntDesign name="search1" size={22} color={COLORS.black} />
        <TextInput placeholder="Pesquisar.." />
      </Pressable>
      <Feather name="mic" size={24} color={COLORS.black} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.green,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 3,
    height: 38,
    marginHorizontal: 7,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
})
