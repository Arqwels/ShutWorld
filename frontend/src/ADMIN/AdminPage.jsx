import React from 'react'
import WrapperComponent from '../pages/WrapperComponent'

import { useContext } from "react";
import { Context } from '..';
import GetUsers from './components/GetUsers';
import AddDonateStatus from './components/Donate/AddDonateStatus';

const AdminPage = () => {
  const { store } = useContext(Context);

  return (
      <WrapperComponent>
          <h2>{store.user.nickname}, Ты теперь читер! :D</h2>
          <GetUsers />
          <AddDonateStatus />
      </WrapperComponent>
  )
}

export default AdminPage