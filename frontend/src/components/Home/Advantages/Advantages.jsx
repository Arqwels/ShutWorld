import whyAreWe from '../../../images/whywe.svg';
import st from "./Advantege.module.scss";

const Advantages = () => {
  return (
    <section className={st.advantages}>
      <h2 className={st.head}>Почему мы?</h2>
      <div className={st.body}>
        <img src={whyAreWe} alt="ImageWhyAreWe" className={st.Img} />
        <ul className={st.text}>
          <li>Мощнейшее оборудование</li>
          <li>Постоянные обновления</li>
          <li>Часто проводим эвенты с игроками</li>
          <li>Уникальность сервера не даёт заскучать</li>
        </ul>
      </div>
    </section>
  )
}

export default Advantages