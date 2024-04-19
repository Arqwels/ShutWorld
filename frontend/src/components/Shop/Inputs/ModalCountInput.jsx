import st from './../Modals/ModalForShop.module.scss';
import Plus from '../../../assets/images/icons/plus.svg';
import Minus from '../../../assets/images/icons/minus.svg';

const ModalCountInput = ({ id, label, className, error, classSts, value, onChange, min, max, ...attrs }) => {
  const errorClass = error ? st.inputBorderError : '';

  const handleIncrement = () => {
    // Увеличиваем значение на 1, но не больше максимального значения
    const incrementedValue = Math.min(parseInt(value) + 1, max);
    // Вызываем функцию onChange для передачи нового значения
    onChange({ target: { name: id, value: incrementedValue } });
  };

  const handleDecrement = () => {
    // Уменьшаем значение на 1, но не меньше минимального значения
    const decrementedValue = Math.max(parseInt(value) - 1, min);
    // Вызываем функцию onChange для передачи нового значения
    onChange({ target: { name: id, value: decrementedValue } });
  };

  return (
    <div className={st.inputWrapper}>
      {label && 
        <div className={st.wrapperLabel}>
          <label className={st.inputLabel} htmlFor={id}>{label}</label>
          {error && <span className={`${st.labelSpan} ${st.labelSpanBackgroundError}`}>{error}</span>}
        </div>
      }
      <div className={st.wrapperInput}>
        <button type="button" className={`${st.button} ${st.btnMinus}`} onClick={handleDecrement}>
          <img src={Minus} alt="Minus" className={st.iconMinus} />
        </button>
        <input 
          name={id}
          id={id}
          className={`${className} ${errorClass} ${classSts}`}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          {...attrs}
          readOnly 
        />
        <button type="button" className={`${st.button} ${st.btnPlus}`} onClick={handleIncrement}>
          <img src={Plus} alt="Plus" className={st.iconPlus} />
        </button>
      </div>
    </div>
  );
};

export default ModalCountInput;
