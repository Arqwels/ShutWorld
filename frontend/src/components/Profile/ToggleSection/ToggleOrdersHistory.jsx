import React, { useState, useEffect } from 'react';
import style from './../Profile.module.scss';
import UserService from '../../../service/UserService';

const ToggleOrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.gettingOrderHistory();
        // Проверяем, есть ли данные в ответе
        if (response.data && response.data.result) {
          // Преобразуем даты в нормальный вид
          const formattedOrders = response.data.result.map(order => ({
            ...order,
            date: new Date(order.date).toLocaleString() // Преобразование даты в строку в формате локали
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.ordersHistoryWrapper}>
      <table className={style.ordersHistory}>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index} className={style.underLine}>
                <td>{order.orderStatus}</td>
                <td>{order.nickname}</td>
                <td>{order.price}₽</td>
                <td>{order.paymentMethod}</td>
                <td>{order.productName}</td>
                <td>{order.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Данные отсутствуют</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ToggleOrdersHistory;
