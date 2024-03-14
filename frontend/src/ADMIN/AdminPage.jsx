import React from 'react'
import WrapperComponent from '../pages/WrapperComponent'

import { useContext } from "react";
import { Context } from '..';
import GetUsers from './components/GetUsers';
import AddDonateStatus from './components/Donate/AddDonateStatus';
import { Link } from 'react-router-dom';
import { ADMIN_EDIT_RANKS } from '../utils/consts';

const AdminPage = () => {
  const { store } = useContext(Context);

  return (
      <WrapperComponent>
          <h2>{store.user.nickname}, Ты теперь читер! :D</h2>
          <GetUsers />
          <AddDonateStatus />
          <Link to={ADMIN_EDIT_RANKS}>Изменить Ранги!</Link>
      </WrapperComponent>
  )
}

export default AdminPage