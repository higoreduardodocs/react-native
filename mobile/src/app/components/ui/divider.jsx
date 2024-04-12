import { View } from 'react-native'

import { COLORS } from '../../../constants/theme'

export default function Divider() {
  return (
    <View
      style={{
        height: 1,
        borderColor: COLORS.gray,
        borderWidth: 2,
        marginTop: 15,
      }}
    />
  )
}
