import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker'

import { COLORS } from '../../../constants/theme'
import { homeCategoriesItems } from '../../../utils/mock'
import ProductItem from '../ui/product-item'

export default function HomeFilter() {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('jewelery')
  const [categoryItems, setCategoryItems] = useState(homeCategoriesItems)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products')
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    return () => fetchData()
  }, [])

  return (
    <>
      <View style={styles.filterContainer}>
        <DropDownPicker
          style={styles.filterDropdown}
          open={open}
          value={category} //genderValue
          items={categoryItems}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setCategoryItems}
          placeholder="Escolher Categoria"
          // placeholderStyle={styles.placeholderStyles}
          // onOpen={onGenderOpen}
          // onChangeValue={onChange}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
      <View style={styles.productsContainer}>
        {products
          ?.filter((item) => item.category === category)
          ?.map((item, i) => (
            <ProductItem key={i} product={item} />
          ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    width: '45%',
  },
  filterDropdown: {
    borderColor: COLORS.mediumGray,
    height: 30,
    // marginBottom: open ? 120 : 15,
  },
  productsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginVertical: 25,
    gap: 20,
  },
})
