import style from './Input.module.scss';

const InputReg = (props) => {
  return (
    <input className={style.inputBut} type={props.type} name={props.name} placeholder={props.placeholder} />
  )
}

export default InputReg