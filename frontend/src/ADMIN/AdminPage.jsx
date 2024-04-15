import React from 'react'
import WrapperComponent from '../pages/WrapperComponent'

import { useContext } from "react";
import { Context } from '..';
import GetUsers from './components/GetUsers';
import { Link } from 'react-router-dom';
import { ADMIN_ADD_ARTIFACT, ADMIN_ADD_RANK, ADMIN_EDIT_RANKS } from '../utils/consts';
import st from './Admin.module.scss';

const AdminPage = () => {
  const { store } = useContext(Context);

  return (
      <WrapperComponent>
          <h2>{store.user.nickname}, Ты теперь читер! :D</h2>
          <GetUsers />
          <ul className={st.listUrls}>
            <li><Link to={ADMIN_ADD_RANK} className={st.buttonAdminPage}>Добавить новый Ранг!</Link></li>
            <li><Link to={ADMIN_ADD_ARTIFACT} className={st.buttonAdminPage}>Добавить новый Артефакт!</Link></li>
            <li><Link to={ADMIN_EDIT_RANKS} className={st.buttonAdminPage}>Изменить Ранги!</Link></li>
          </ul>
      </WrapperComponent>
  )
}

export default AdminPage