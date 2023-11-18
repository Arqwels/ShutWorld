import React, { useEffect, useState } from 'react';

import st from "./New.module.scss";

import './News.css'
import PostVKService from '../../../service/GetPostVKService';
import NewsArticle from './NewsArticle';

const News = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await PostVKService.reqPostVK();
        const sortPosts = data.sort((a, b) => b.idPost - a.idPost);
        setPosts(sortPosts);
        // Сделать ссылки пример https://vk.com/shutworld?w=wall-221465919_[тута должна быть idPost]%2Fall
      } catch (error) {
        console.error(error);
      }
    }
    fetchPost();
  }, [])

  return (
    <section className={st.news}>
      <h2 className={st.title}>Последние новости</h2>
      <div className={st.body}>
        {posts.map((post, index) => (
          
          <NewsArticle key={index++} index={index} data={posts} {...post} />
        ))}
        {console.log(posts)}
      </div>
    </section>
  )
}

export default News