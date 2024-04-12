import { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SliderBox } from 'react-native-image-slider-box'

import { homeSlides } from '../../../utils/mock'
import { COLORS } from '../../../constants/theme'
import HomeSearch from '../../components/widgets/home-search'
import HomeLocation from '../../components/widgets/home-location'
import HomeCategories from '../../components/widgets/home-categories'
import HomeDeals from '../../components/widgets/home-deals'
import HomeFilter from '../../components/widgets/home-filter'
import HomeModal from '../../components/widgets/home-modal'

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false)

  const handleModalVisible = () => setModalVisible((prevState) => !prevState)

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView>
          <HomeSearch />
          <HomeLocation handleModalVisible={handleModalVisible} />
          <HomeCategories />
          <SliderBox
            images={homeSlides}
            autoPlay
            dotColor={COLORS.darkGray}
            inactiveDotColor={COLORS.lightGray}
            ImageComponentStyle={{ width: '100%' }}
          />
          <HomeDeals />
          <HomeFilter />
        </ScrollView>
      </SafeAreaView>
      <HomeModal
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
      />
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // paddingTop: Platform.OS === 'android' ? 40 : 0,
    flex: 1,
    backgroundColor: COLORS.white,
  },
})
