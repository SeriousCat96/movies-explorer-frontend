import { Link } from '../Link/Link';
import logo from '../../images/promo.svg'
import './Promo.css';

function Promo({onClick}) {
  return (
    <section className="promo app__section">
      <img className="promo__logo" src={logo} alt="Логотип промо"/>
      <h1 className="promo__title">
        Учебный проект студента фаультета Веб-разработки.
      </h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <Link to="#about" className="promo__link">
        Узнать больше
      </Link>
    </section>
  );
}

export default Promo;
