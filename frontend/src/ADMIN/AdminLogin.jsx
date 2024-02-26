import React from 'react'
import WrapperComponent from '../pages/WrapperComponent'
import FormLogin from './components/FormLogin'

const AdminLogin = () => {
  return (
    <div className='wrapper'>
      <WrapperComponent>
        <FormLogin />
      </WrapperComponent>
    </div>
  )
}

export default AdminLogin