import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import st from "./NewsSlider.module.scss";

// Функция для сокращения текста. Если с backend приходит большой пост, то он тут будет сокращаться
// и подстраиваться под размер экрана пользователя
const truncateText = (text, wordCount) => {
  // Разбиваем текст на слова, используя пробел в качестве разделителя
  const words = text.split(' ');
  // Если количество слов больше заданного предела (wordCount),
  // то возвращаем срез массива слов, объединенных пробелами,
  // и добавляем многоточие в конце
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...'; 
  }
  return text;
};

// Функция форматирования даты в соответствии с Российскими стандартами:
// Возвращает дату в формате "день.месяц.год"
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const NewsForSlider = ({ idPost, titlePost, textPost, datePost }) => {
  // Состояние для усеченного текста
  const [truncatedText, setTruncatedText] = useState(truncateText(textPost, 30));

  // Эффект для обновления состояний при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 420;
      setTruncatedText(truncateText(textPost, smallScreen ? 15 : 30));
    };

    // Добавление слушателя события изменения размера окна
    window.addEventListener('resize', handleResize);

    // Удаление слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [textPost]);

  return (
    <article className={`${st.card} ${st.big}`}>
      <div className={st.cardHead}>
        <h2>{titlePost}</h2>
        <p>{truncatedText}</p>
      </div>
      <p className={st.date}>{formatDate(datePost)}</p>
      <Link className={st.cardButton} to={`https://vk.com/shutworld?w=wall-221465919_${idPost}%2Fall`} target="_blank">
        Прочитать полностью
      </Link>
    </article>
  );
};

export default NewsForSlider;