import React from 'react';
import style from './../Profile.module.scss';

const ToggleOrdersHistory = ({ data }) => {
  console.log(data);
  return (
    <div className={style.ordersHistoryWrapper}>
      <table className={style.ordersHistory}>
        <tbody>
          {data && data.length > 0 ? (
            <>
              {data.map((order, index) => (
                <tr key={index} className={style.underLine}>
                  <td>{order['order-status']}</td>
                  <td>{order.nickname}</td>
                  <td>{order.price}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order['product-name']}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </>
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
