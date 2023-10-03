import React, { useEffect, useState } from 'react'
// import style from './Account.module.scss';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Footer from '../../components/Footer';

function AccountPage() {
  const [ nickname, setNickname ] = useState();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className='container'>Привет, {nickname}</div>
      {/* <Footer /> */}
    </>
  )
}

export default AccountPage