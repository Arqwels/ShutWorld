import st from "../Artifact.module.scss";

const InputFromForm = ({ id, labelText, className, ...attrs }) => {
  return (
    <>
      <label htmlFor={id} className={st.label}>{labelText}</label>
      <input 
        name={id}
        id={id}
        className={className}
        {...attrs}
      />
    </>
  );
};

export default InputFromForm;