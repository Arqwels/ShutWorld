import React, { useState } from 'react';
import style from "./Pay&Duration.module.scss"
import SelectIcon from '../../../images/SelectIcon.svg';
import { observer } from 'mobx-react-lite';
import formStore from '../../../store/form';

export const PaymentMethod = ({ onSelectPaymentMethod, selectStatus, resetMethodStatus }) => {
  const { stateVisibl2, toggleDropdownVisible2 } = formStore;
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    toggleDropdownVisible2(false);
    onSelectPaymentMethod(method);
    resetMethodStatus();
  };

  return (
    <div className={style.bodyForm}>
      <label className={style.labelDurationText} htmlFor="payMethod">Способ оплаты</label>
      {selectStatus && <span className={style.statusError}>{selectStatus}</span>}
      <div className={`${style.select} ${stateVisibl2 ? '' : style.active}`} style={{ zIndex: 9 }}>
        <div className={`${style.selectHeader} ${selectedMethod ? style.selected : ''} ${selectStatus ? style.statusErrorBorder : ''}`} onClick={()=> toggleDropdownVisible2()}>
          <div className={style.selectTextNormal}>
            {selectedMethod ? selectedMethod.label : 'Выберите способ оплаты'}
          </div>
          <div className={`${style.selectHeaderPrice} ${style.selectTextBold}`}>
            {selectedMethod ? selectedMethod.price : ''}
          </div>
          <img src={SelectIcon} alt="SelectIcon" className={`${style.selectIcon} ${stateVisibl2 ? style.activeIcon : ''}`} />
        </div>
        <div className={style.selectBody + (stateVisibl2 ? ' ' + style.active : '')}>
          <div className={style.selectBodyItem} onClick={() => handleSelect({ label: 'QIWI', price: 'Комиссия 3%' })}>
            <div className={style.selectTextNormal}>QIWI</div>
            <div className={style.selectTextBold}>Комиссия 3%</div>
          </div>
          <div className={style.selectBodyItem} onClick={() => handleSelect({ label: 'Банковская карта', price: 'Комиссия 0%' })}>
            <div className={style.selectTextNormal}>Банковская карта</div>
            <div className={style.selectTextBold}>Комиссия 0%</div>
          </div>
          <div className={style.selectBodyItem} onClick={() => handleSelect({ label: 'Bitcoin', price: 'Комиссия 5%' })}>
            <div className={style.selectTextNormal}>Bitcoin</div>
            <div className={style.selectTextBold}>Комиссия 5%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer( PaymentMethod );
