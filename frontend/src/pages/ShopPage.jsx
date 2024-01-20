import WrapperComponent from './WrapperComponent'
import SliderShop from '../components/Shop/SliderInfo/SliderShop'
import Ranks from '../components/Shop/Ranks'
import Artifacts from '../components/Shop/Artifacts'

const ShopPage = () => {
  return (
    <WrapperComponent>
      <SliderShop />
      <Ranks />
      <Artifacts />
    </WrapperComponent>
  )
}

export default ShopPage