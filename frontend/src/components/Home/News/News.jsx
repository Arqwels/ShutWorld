import React, { useEffect, useState } from 'react';

import st from "./New.module.scss";

import './News.css'
import PostVKService from '../../../service/GetPostVKService';
import NewsArticle from './NewsArticle';
import NewsSlider from './NewsSliderMob/NewsSlider';

const News = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await PostVKService.reqPostVK();
        const sortPosts = data.sort((a, b) => b.idPost - a.idPost);
        setPosts(sortPosts);
        console.log(sortPosts);
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
      </div>
      <div className={st.sliderNews}>
        <NewsSlider posts={posts}/>
      </div>
      
    </section>
  )
}

export default News