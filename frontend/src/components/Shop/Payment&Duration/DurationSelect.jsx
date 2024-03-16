import React, { useState } from 'react';
import style from './Pay&Duration.module.scss';
import SelectIcon from '../../../images/SelectIcon.svg'
import { observer } from 'mobx-react-lite';
import formStore from '../../../store/form';

export const DurationSelect = ({ donateStatus, onDurationSelect, selectStatus, resetSelectStatus }) => {
  const { stateVisibl1, toggleDropdownVisible1 } = formStore;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    toggleDropdownVisible1(false);
    onDurationSelect(item);
    resetSelectStatus();
  };

  return (
    <div className={style.bodyForm}>
      <label className={style.labelDurationText} htmlFor="duration">Длительность</label>
      {selectStatus && <span className={style.statusError}>{selectStatus}</span>}
      <div className={`${style.select} ${stateVisibl1 ? style.active : ''}`} style={{ zIndex: 10 }}>
        <div className={`${style.selectHeader} ${selectedItem ? style.selected : ''} ${selectStatus ? style.statusErrorBorder : ''}`} onClick={()=> toggleDropdownVisible1()}>
          <div className={style.selectTextNormal}>
            {selectedItem ? selectedItem.labelDuration : 'Выберите на сколько возьмёте'}
          </div>
          <div className={`${style.selectHeaderPrice} ${style.selectTextBold}`}>
            {selectedItem ? selectedItem.price + "₽" : ''}
          </div>
          <img src={SelectIcon} alt="SelectIcon" className={`${style.selectIcon} ${stateVisibl1 ? style.activeIcon : ''}`} />
        </div>
        <div className={style.selectBody + (stateVisibl1 ? ' ' + style.active : '')}>
          {Array.isArray(donateStatus['duration-donates']) && donateStatus['duration-donates'].map((item, index) => (
            <div key={index} className={style.selectBodyItem} onClick={() => handleSelect(item)}>
              <div className={style.selectTextNormal}>{item.labelDuration}</div>
              <div className={style.selectTextBold}>{item.price}₽</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(DurationSelect);
