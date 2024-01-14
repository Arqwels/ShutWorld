import React, { useState } from 'react';
import style from './Pay&Duration.module.scss';
import SelectIcon from '../../../images/SelectIcon.svg'
import { observer } from 'mobx-react-lite';
import formStore from '../../../store/form';

export const DurationSelect = ({ donateStatus }) => {
  const { stateVisibl1, toggleDropdownVisible1 } = formStore;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    toggleDropdownVisible1(false);
  };

  return (
    <div className={style.bodyForm}>
      <label className={style.labelDurationText} htmlFor="duration">Длительность</label>
      <div className={`${style.select} ${stateVisibl1 ? style.active : ''}`} style={{ zIndex: 10 }}>
        <div className={style.selectHeader} onClick={()=> toggleDropdownVisible1()}>
          <div className={style.selectTextNormal}>
            {selectedItem ? selectedItem.labelDuration : 'Выберите на сколько возьмёте'}
          </div>
          <div className={`${style.selectHeaderPrice} ${style.selectTextBold}`}>
            {selectedItem ? selectedItem.labelPrice : ''}
          </div>
          <img src={SelectIcon} alt="SelectIcon" className={`${style.selectIcon} ${stateVisibl1 ? style.activeIcon : ''}`} />
        </div>
        <div className={style.selectBody + (stateVisibl1 ? ' ' + style.active : '')}>
          {donateStatus.duration.map((item, index) => (
            <div key={index} className={style.selectBodyItem} onClick={() => handleSelect(item)}>
              <div className={style.selectTextNormal}>{item.labelDuration}</div>
              <div className={style.selectTextBold}>{item.labelPrice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer ( DurationSelect );