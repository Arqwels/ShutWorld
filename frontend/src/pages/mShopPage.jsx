import React from 'react'
import WrapperComponent from './WrapperComponent'
import ModalSandbox from '../components/Shop/Sandbox'
import SliderShop from '../components/Shop/SliderInfo/SliderShop'

const AuthPage = () => {
  return (
    <WrapperComponent>
      <SliderShop />
      <ModalSandbox />
    </WrapperComponent>
  )
}

export default AuthPage