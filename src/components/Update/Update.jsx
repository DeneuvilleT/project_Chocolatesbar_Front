import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { validateAccount } from '../../api/user';

import styles from './update.module.css';

const Update = () => {

   const [active, setActive] = useState(false);
   const [msg, setMsg] = useState('');
   const params = useParams();

   useEffect(() => {
      checkMail(params.email);
   }, []);

   // Check mail if user has already activate his account
   const checkMail = async (mail) => {
      const res = await validateAccount(mail);
      if (res.status === 201) {
         setActive(true);
         return setMsg(res.data.msg);
      };
      return setMsg(res.data.msg);
   };


   return (
      <main className={styles.update}>

         <h1>{!active ? "Bienvenue sur Chocolate's Bar" : ""}</h1>

         <h3>{msg}</h3>

         <Link to={"/"}>Vous pouvez dés à présent retrouver tous nos produits sur notre boutique en ligne en cliquant sur ce lien.</Link>

      </main>
   );
};

export default Update;