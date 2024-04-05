import { useState } from 'react';
import style from './../Profile.module.scss';
import IconMark from '../../../assets/images/icons/chevron-right-small.svg';
import TogglePassword from './TogglePassword';
import ToggleOrdersHistory from './ToggleOrdersHistory';


const ToggleSection = ({ image, altImage, bodyText, emailText, emailSubmit, btnState, passwordSubmit, error, ordersHistory }) => {
  const [ active, setActive ] = useState(false);

  return (
    <>
      <button className={style.toggleSection} onClick={() => setActive(!active)} style={{ marginBottom: active ? '' : '32px' }}>
        <img src={image} alt={altImage} className={style.sectionImage}/>
        {bodyText}
        <img 
          src={IconMark} 
          alt='IconMark' 
          className={style.toggleMark} 
          style={{ transform: active ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        />
      </button>
      {active && (
        <div className={style.dropDownList}>
          {emailSubmit && (
            <div className={style.dropDownListMail}>
              {emailText}
              <button className={style.btn} onClick={emailSubmit} disabled={btnState}>Отправить</button>
            </div>
          )}
          {passwordSubmit && (
            <TogglePassword functionSubmit={passwordSubmit} error={error}/>
          )}
          {ordersHistory && (
            <ToggleOrdersHistory data={ordersHistory} />
          )}
        </div>
      )}
    </>
    
  )
}

export default ToggleSection