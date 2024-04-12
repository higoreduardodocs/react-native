import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native'

import { homeCategories } from '../../../utils/mock'

export default function HomeCategories() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {homeCategories.map((item, i) => (
        <Pressable key={i} style={styles.categoriesItem}>
          <Image style={styles.categoriesImage} source={{ uri: item.image }} />
          <Text style={styles.categoriesName}>{item.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoriesItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  categoriesImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoriesName: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },
})
