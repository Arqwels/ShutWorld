import React from 'react'
import WrapperComponent from './WrapperComponent'
import ModalSandbox from '../components/Shop/Sandbox'
import SliderShop from '../components/Shop/SliderInfo/SliderShop'
import Ranks from '../components/Shop/Ranks'
import Artifacts from '../components/Shop/Artifacts'

const AuthPage = () => {
  return (
    <WrapperComponent>
      <SliderShop />
      <Ranks />
      <Artifacts />
      <ModalSandbox />
    </WrapperComponent>
  )
}

export default AuthPage