import { Pressable, StyleSheet } from 'react-native'
import { FontAwesome5, Entypo } from '@expo/vector-icons'

import { COLORS } from '../../../constants/theme'

export default function CardSelected({ selected, children, ...props }) {
  return (
    <Pressable style={styles.buttonWrapper} {...props}>
      {selected ? (
        <FontAwesome5 name="dot-circle" size={20} color={COLORS.green} />
      ) : (
        <Entypo name="circle" size={20} color="gray" />
      )}
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 3,
    width: '100%',
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
})
