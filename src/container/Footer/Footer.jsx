import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

import styles from '../Footer/footer.module.css';


const Footer = () => {
   return (
      <footer className={styles.footer}>

         <div>
            <p>chocolate's compagny - copyright <FontAwesomeIcon icon={faCopyright} size='1x' /></p>
         </div>

         <div>
            <a href='https://www.linkedin.com/in/thomas-deneuville-68965994'><FontAwesomeIcon icon={faLinkedin} size='4x' /></a >
            <a href='https://github.com/DeneuvilleT'><FontAwesomeIcon icon={faGithubSquare} size='4x' /></a >
         </div>

      </footer>
   );
};



export default Footer;