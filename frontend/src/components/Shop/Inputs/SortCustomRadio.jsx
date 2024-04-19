import st from "./Radio.module.css";

const SortCustomRadio = ({ id, value, label, checked, onChange }) => {
  return (
    <div className={st.radioWrapper}>
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className={st.radioInput}
      />
      <label htmlFor={id} className={st.radioLabel}>
        <span className={`${st.square} ${checked ? st.checked : ''}`} />
        {label}
      </label>
    </div>
  );
};

export default SortCustomRadio;
