import { View, StyleSheet, TextInput } from 'react-native'

import { COLORS } from '../../../../constants/theme'

export default function Text({ style, children, ...props }) {
  return (
    <View style={style}>
      <View style={styles.wrapper}>
        {children}
        <TextInput style={styles.field} {...props} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.gray,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 30,
  },
  field: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
})
