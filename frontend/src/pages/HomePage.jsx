import React from 'react';

import HeroHeader from '../components/HeroHeader/HeroHeader';
import Footer from '../components/Footer';
import Advantages from '../components/Home/Advantages';
import News from '../components/Home/News';
import Contacts from '../components/Home/Contacts';
import Decoration from '../components/Home/Decoration';

const Home = () => {
  return (
    <>
      <HeroHeader />
      <Advantages />
      <News />
      <Contacts />
      <Decoration />
      <Footer />
    </>
  )
}

export default Home