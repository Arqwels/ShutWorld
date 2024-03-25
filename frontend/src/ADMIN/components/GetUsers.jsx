import React from 'react'
import AdminService from '../../service/AdminService';
import style from '../Admin.module.scss';

const GetUsers = () => {
  const getUsers = async () => {
    console.log(123);
    try {
      const { data } = await AdminService.getUsers();
      console.log(data);
      // Доделать нормальный вывод!
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={style.getUsersContainer}>
      <h2 className={style.getUsersTitle}>Получить всех юзеров!</h2>
      <button className={style.getUsersButton} onClick={getUsers}>Получить всех!</button>
    </div>
  )
}

export default GetUsers