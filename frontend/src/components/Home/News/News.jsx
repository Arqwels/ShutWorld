import React from 'react';
import { Link } from "react-router-dom";

import st from "./New.module.scss";

import './News.css'

const News = () => {
  return (
    <section className={st.news}>
        <h2 className={st.title}>Последние новости</h2>

        <div className={st.body}>
          <article className={`${st.card} ${st.big}`}>
            <div className={st.cartHead}>
              <h2>Новость #1</h2>
              <p>02.10.2022</p>
            </div>
            <p>Всем привет, многое произошло с данным проектом и в целом. Я думаю, все предполагали, что сервер умер (выше пост), но до нового года я тоже так думал. Но это не правда...</p>
            <div className={st.cardButton}>
              <Link to="#">Прочитать полностью</Link>
            </div>
          </article>
          <article className={st.card}>
            <div className={st.cartHead}>
              <p>02.10.2022</p>
              <h2>Новость #2</h2>
            </div>
            <Link className={st.cardButton} to="#">Открыть</Link>
          </article>
          <article className={st.card}>
            <div className={st.cartHead}>
              <p>02.10.2022</p>
              <h2>Новость #3</h2>
            </div>
            <Link className={st.cardButton} to="#">Открыть</Link>
          </article>
          <article className={st.card}>
            <div className={st.cartHead}>
              <p>02.10.2022</p>
              <h2>Новость #4</h2>
            </div>
            <Link className={st.cardButton} to="#">Открыть</Link>
          </article>
          <article className={st.card}>
            <div className={st.cartHead}>
              <p>02.10.2022</p>
              <h2>Новость #5</h2>
            </div>
            <Link className={st.cardButton} to="#">Открыть</Link>
          </article>
          <article className={`${st.card} ${st.big}`}>
            <div className={st.cartHead}>
              <h2>Новость #6</h2>
              <p>02.10.2022</p>
            </div>
            <p>Всем привет, многое произошло с данным проектом и в целом. Я думаю, все предполагали, что сервер умер (выше пост), но до нового года я тоже так думал. Но это не правда...</p>
            <div className={st.cardButton}>
              <Link to="#">Прочитать полностью</Link>
            </div>
          </article>
        </div>
      </section>
  )
}

export default News