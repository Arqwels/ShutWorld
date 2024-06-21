import React from "react";
import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={style.loader}>
      <div className={style.spinner}></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default Loader;