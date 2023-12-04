import HeroHeader from '../components/Home/HeroHeader/HeroHeader';
import Advantages from '../components/Home/Advantages/Advantages';
import News from '../components/Home/News/News';
import Contacts from '../components/Home/Contacts/Contacts';
import Decoration from '../components/Home/Decoration';
import WrapperComponent from './WrapperComponent';
import "../components/Home/HomeStyles.scss";

const Home = () => {
  return (
    <WrapperComponent>
      <HeroHeader />
      <Advantages />
      <News />
      <Contacts />
      <Decoration />
    </WrapperComponent>
  )
};

export default Home;