import st from '../../Admin.module.scss';

const DurationInput = ({ duration, labelDuration, price, onChange }) => {
  const handleKeyPress = (e) => {
    const allowedChars = "0123456789";
    if (!allowedChars.includes(e.key)) {
      e.preventDefault();
    }
  };
  
  return (
    <div className={st.inputGroup}>
      <input
        type='text'
        name='duration'
        value={duration}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        placeholder="Продолжительность (ticks)"
        className={st.input}
        required
      />
      <input
        type='text'
        name='labelDuration'
        value={labelDuration}
        onChange={onChange}
        placeholder="Продолжительность в текстовом виде"
        className={st.input}
        required
      />
      <input
        type='text'
        name='price'
        value={price}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        placeholder="Цена"
        className={st.input}
        required
      />
    </div>
  );
};

export default DurationInput;
