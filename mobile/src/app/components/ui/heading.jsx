import { Text } from 'react-native'

export default function Heading({ children }) {
  return (
    <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
      {children}
    </Text>
  )
}
