import { useDispatch } from 'react-redux';
import { saveDetail } from '../../slices/datasSlices';
import { Link } from 'react-router-dom';
import styles from './home.module.css';


const Home = () => {

  const dispatch = useDispatch();

  return (
    <main className={styles.home}>

      <div>
      <h1>Bienvenue <span>sur le</span></h1>
      <h1> Chocolate's Bar</h1>
      </div>

      <figure>
        <figcaption>Venez découvrir plus de 2500 références de tablettes de chocolat de toutes origines !</figcaption>
      </figure>

      <Link onClick={() => dispatch(saveDetail(null))} to={"/product/search"}>Nos Produits</Link>

    </main>
  );
};

export default Home;

