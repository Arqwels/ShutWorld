import { rulesStor } from '../components/Rules/RulesStore';
import RylesItem from '../components/Rules/RylesItem';

const Rules = () => {

  return (
    <main className="container">
      <section className="rules__title">
        <h2>Правила</h2>
        <p>Соблюдайте правила, чтобы не получить блокировку аккаунта</p>
      </section>
      <section className="rules__body">
        <ul className="rules__items">
          {rulesStor.map((item, idx) => (
            <RylesItem rule={item} key={`menu item ${idx}`} />
          ))}
        </ul>
      </section>
    </main>
  )
}



export default Rules