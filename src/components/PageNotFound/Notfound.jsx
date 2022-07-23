import styles from './notfound.module.css';

const Notfound = () => {
   return (
      <main className={styles.notfound} >
         <h2>Erreur 404</h2>
         <h3>Page non trouvée.</h3>
      </main>
   );
};

export default Notfound;