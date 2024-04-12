import { Text, TextInput, View, StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants/theme'

export default function TextLabel({ label, ...props }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.gray}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  label: { fontSize: 15, fontWeight: 'bold' },
  input: {
    padding: 10,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
})
