import styles from '../Header/header.module.css';
import Logs from '../../components/Logs/Logs';
import Logo from '../../assets/logo_png.png';
import Nav from '../Nav/Nav';

const Header = () => {
   return (
      <header className={styles.header}>

         <figcaption>
            <img src={Logo} alt="logo" />
         </figcaption>
         
         <Nav />

         <Logs />

      </header>
   );
};



export default Header;