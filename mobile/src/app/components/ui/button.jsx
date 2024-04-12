import { Pressable, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants/theme'

export default function Button({ className, children, ...props }) {
  return (
    <Pressable style={styles.wrapper(className)} {...props}>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: (className) => ({
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightYellow,
    padding: 10,
    borderRadius: 5,
    ...className,
  }),
})
