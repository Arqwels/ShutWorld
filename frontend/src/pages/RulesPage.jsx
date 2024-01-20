import { rulesStor } from "../components/Rules/RulesStore";
import RylesItem from "../components/Rules/RylesItem";
import WrapperComponent from "./WrapperComponent";
import style from "../components/Rules/Rules.module.scss";

const RulesPage = () => {
  return (
    <WrapperComponent>
      <section className={style.rulesTitle}>
        <h2>Правила</h2>
        <p>Соблюдайте правила, чтобы не получить блокировку аккаунта</p>
      </section>
      <section className={style.rulesBody}>
        <ul className={style.rulesItems}>
          {rulesStor.map((item, idx) => (
            <RylesItem rule={item} key={`menu item ${idx}`} />
          ))}
        </ul>
      </section>
    </WrapperComponent>
  );
};

export default RulesPage;