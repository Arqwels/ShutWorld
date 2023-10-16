import React, { useState } from 'react';

import style from './Duration.module.scss';

import DurationIcon from '../../images/DurationIcon.svg'

function DurationSelect() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={style.bodyForm}>
      <label className={style.labelDurationText} htmlFor="duration">Длительность</label>
      <div className={`${style.select} ${isDropdownVisible ? style.active : ''}`} style={{ zIndex: 10 }}>
        <div className={style.selectHeader} onClick={toggleDropdown}>
          <div className={style.selectTextNormal}>
            {selectedItem ? selectedItem.label : 'Выберите на сколько возьмёте'}
          </div>
          <div className={`${style.selectHeaderPrice} ${style.selectTextBold}`}>
            {selectedItem ? selectedItem.price : ''}
          </div>
          <img src={DurationIcon} alt="DurationIcon" className={`${style.durationIcon} ${isDropdownVisible ? style.activeIcon : ''}`} />
        </div>
        <div className={style.selectBody + (isDropdownVisible ? ' ' + style.active : '')}>
          <div className={style.selectBodyItem} onClick={() => handleSelect({ label: '1 месяц', price: '240₽' })}>
            <div className={style.selectTextNormal}>1 месяц</div>
            <div className={style.selectTextBold}>240₽</div>
          </div>
          <div className={style.selectBodyItem} onClick={() => handleSelect({ label: '3 месяца', price: '480₽' })}>
            <div className={style.selectTextNormal}>3 месяца</div>
            <div className={style.selectTextBold}>480₽</div>
          </div>
          <div className={style.selectBodyItem} onClick={() => handleSelect({ label: 'Навсегда', price: '1480₽' })}>
            <div className={style.selectTextNormal}>Навсегда</div>
            <div className={style.selectTextBold}>1480₽</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DurationSelect;
