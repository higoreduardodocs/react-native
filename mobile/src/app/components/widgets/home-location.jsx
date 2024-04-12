import { Pressable, StyleSheet, Text } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import { COLORS } from '../../../constants/theme'

export default function HomeLocation({ handleModalVisible }) {
  return (
    <Pressable style={styles.locationContainer} onPress={handleModalVisible}>
      <Ionicons name="location-outline" size={24} color={COLORS.black} />
      <Pressable>
        <Text>Endereço: John Doe - Rua</Text>
      </Pressable>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={24}
        color={COLORS.black}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.lightGreen,
    padding: 10,
  },
})
