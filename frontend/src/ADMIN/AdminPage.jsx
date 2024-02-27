import React from 'react'
import WrapperComponent from '../pages/WrapperComponent'

import { useContext } from "react";
import { Context } from '..';

const AdminPage = () => {
  const { store } = useContext(Context);

  return (
    <div className='wrapper'>
      <WrapperComponent>
        <h3>gergerg</h3>
      </WrapperComponent>
    </div>
  )
}

export default AdminPage