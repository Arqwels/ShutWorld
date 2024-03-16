import React from 'react'
import AdminService from '../../service/AdminService';

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
    <>
      <h2>Получить всех юзеров!</h2>
      <button onClick={getUsers}>Получить всех!</button>
    </>
  )
}

export default GetUsers