import React from 'react'
import WrapperComponent from '../pages/WrapperComponent'

import { useContext } from "react";
import { Context } from '..';
import GetUsers from './components/GetUsers';

const AdminPage = () => {
  const { store } = useContext(Context);

  return (
      <WrapperComponent>
        <h2>{store.user.nickname}, Ты теперь читер! :D</h2>
        <GetUsers />
      </WrapperComponent>
  )
}

export default AdminPage