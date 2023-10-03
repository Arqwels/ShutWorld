import React from 'react';
import { Link } from "react-router-dom";

const News = () => {
  return (
    <section className="news container">
      <h2 className="news__head">Последние новости</h2>
      <div className="news__top__blocks">
        <article className="news__big__block">
          <div className="news__big__block-head">
            <h2>Новость #1</h2>
            <p>02.10.2022</p>
          </div>
          <p className="news__big__block-text">Всем привет, многое произошло с данным проектом и в целом. Я думаю, все предполагали, что сервер умер (выше пост), но до нового года я тоже так думал. Но это не правда...</p>
          <div className="news__big__block-button"><Link to="#">Прочитать полностью</Link></div>
        </article>
        <article className="news__small__block">
          <div className="news__sBlock">
            <p>02.10.2022</p>
            <h2>Новость #1</h2>
            <div className="news__small__block-button">
              <Link to="#">Открыть</Link>
            </div>
          </div>
        </article>
        <article className="news__small__block">
          <div className="news__sBlock">
            <p>02.10.2022</p>
            <h2>Новость #1</h2>
            <div className="news__small__block-button">
              <Link to="#">Открыть</Link>
            </div>
          </div>
        </article>
      </div>
      <div className="news__bottom__blocks">
        <article className="news__small__block">
          <div className="news__sBlock">
            <p>02.10.2022</p>
            <h2>Новость #1</h2>
            <div className="news__small__block-button">
              <Link to="#">Открыть</Link>
            </div>
          </div>
        </article>
        <article className="news__small__block">
          <div className="news__sBlock">
            <p>02.10.2022</p>
            <h2>Новость #1</h2>
            <div className="news__small__block-button">
              <Link to="#">Открыть</Link>
            </div>
          </div>
        </article>
        <article className="news__big__block">
          <div className="news__big__block-head">
            <h2>Новость #1</h2>
            <p>02.10.2022</p>
          </div>
          <p className="news__big__block-text">Всем привет, многое произошло с данным проектом и в целом. Я думаю, все предполагали, что сервер умер (выше пост), но до нового года я тоже так думал. Но это не правда...</p>
          <div className="news__big__block-button"><Link to="#">Прочитать полностью</Link></div>
        </article>
      </div>
    </section>
  )
}

export default News