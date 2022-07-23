import { useDispatch } from 'react-redux';
import { saveDetail } from '../../slices/datasSlices';
import { Link } from 'react-router-dom';
import styles from './home.module.css';


const Home = () => {

  const dispatch = useDispatch();

  return (
    <main className={styles.home}>

      <h1>Bienvenue</h1>
      <h1>sur le Chocolate's Bar !</h1>

      <figure>
        <figcaption>Venez découvrir plus de 2500 références de tablettes de chocolat de toutes origines !</figcaption>
      </figure>

      <Link onClick={() => dispatch(saveDetail(null))} to={"/product/search"}>Nos Produits</Link>

    </main>
  );
};

export default Home;

