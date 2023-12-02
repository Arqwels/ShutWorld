import React from 'react';
import { Link } from 'react-router-dom';
import st from "./New.module.scss";

const truncateText = (text, wordCount) => {
  const words = text.split(' ');
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...';
  }
  return text;
};

const NewsArticle = ({ idPost, titlePost, datePost, textPost, index, data }) => {
  const isBig = index === 0 || index === data.length - 1;
  const truncatedText = truncateText(textPost, 30);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <article className={`${st.card} ${isBig ? st.big : st.little}`}>
      <div className={st.cardHead}>
        <h2>{titlePost}</h2>
        <p>{formatDate(datePost)}</p>
      </div>
      {isBig && <p>{truncatedText}</p>}
      <Link className={st.cardButton} to={`https://vk.com/shutworld?w=wall-221465919_${idPost}%2Fall`} target="_blank">Прочитать полностью</Link>
    </article>
  )
}

export default NewsArticle