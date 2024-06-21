import { useState, useEffect } from "react";
import WrapperComponent from "./WrapperComponent";
import style from "../components/Rules/Rules.module.scss";
import RulesService from "../service/RulesService";
import RulesItem from "../components/Rules/RulesItem";
import Loader from "../components/Loader/Loader";

const RulesPage = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await RulesService.getRules();

        // Проверка на тип данных и установка правил
        const fetchedRules = Array.isArray(response.data) ? response.data : [];
        setRules(fetchedRules);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <WrapperComponent>
        <p>{error}</p>
      </WrapperComponent>
    );
  }

  if (rules.length === 0) {
    return (
      <WrapperComponent>
        <section className={style.noRules}>
          <h2>Правила отсутствуют</h2>
          <p>На данный момент нет доступных правил. Пожалуйста, проверьте позже.</p>
        </section>
      </WrapperComponent>
    );
  }

  return (
    <WrapperComponent>
      <section className={style.rulesTitle}>
        <h2>Правила</h2>
        <p>Соблюдайте правила, чтобы не получить блокировку аккаунта</p>
      </section>
      <section className={style.rulesBody}>
        <ul className={style.rulesItems}>
          {rules.map((item, idx) => (
            <RulesItem rule={item} key={`menu item ${idx}`} />
          ))}
        </ul>
      </section>
    </WrapperComponent>
  );
};

export default RulesPage;