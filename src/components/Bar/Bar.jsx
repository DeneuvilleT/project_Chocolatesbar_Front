import { useEffect, useState } from 'react';
import { URL_LOCAL } from '../../utilities';

import styles from '../Bar/bar.module.css';
import dark_chocolate from '../../assets/bar_chocolate_dark.png';
import milk_chocolate from '../../assets/bar_chocolate_milk.png';
import white_chocolate from '../../assets/bar_chocolate_white.png';

const Bar = ({ onclick, percent, title, category, factory }) => {

   const [cover, setCover] = useState('');

   useEffect(() => {
      changeCover();
   }, []);

   // Change cover bar chocolate from percent cacao
   const changeCover = () => {
      if (percent > 43) {
         setCover(`url(${URL_LOCAL}${dark_chocolate})`);
      } else if (percent <= 43 && percent > 25) {
         setCover(`url(${URL_LOCAL}${milk_chocolate})`);
      } else {
         setCover(`url(${URL_LOCAL}${white_chocolate})`);
      };
   };


   return (
      <>
         <article onClick={onclick} className={styles.bar} style={{ backgroundImage: cover }} title='Plus de détails' >

            <h1>{percent.toFixed(1)}%</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3%' }} >
               
               <h3>{title}</h3>
               <p style={{ margin: '0'}} >Chocolat {category}</p>
               <b>{factory}</b>

            </div>

         </article>
      </>
   );
};

export default Bar;