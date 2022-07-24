import { notification, valueOk } from '../../../utilities';
import { logupNewUser } from '../../../api/user';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AddForm from '../../AddForm/AddForm';
import styles from '../Customer/customer.module.css';

const Logup = () => {

   const [msg, setMsg] = useState('');

   const signup = async (e) => {
      e.preventDefault();

      if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
         return notification(setMsg, 'Tous les champs doivent être remplis.');
      };

      if (!e.target[2].value.match(valueOk)) {
         return notification(setMsg, 'Le mot de passe ne correspond pas aux exigences.');
      };

      const datas = {
         surname: e.target[0].value,
         email: e.target[1].value,
         password: e.target[2].value,
      };

      e.target.reset();
      const res = await logupNewUser(datas);

      if (res.status === 200) {
         return notification(setMsg, res.data.msg);
      };
      return notification(setMsg, res.response.data.msg);
   };


   return (
      <main className={styles.login} >
         <h1>Créer un compte</h1>

         <section>

            <AddForm onsubmit={(e) => signup(e)} inputs={[
               {
                  type: "text", placeholder: "pseudo",
                  text: "Ce nom de compte sera affiché sur le site."
               },
               {
                  type: "email", placeholder: "email",
                  text: "Nous vous enverrons un email à cette adresse par mesure de sécurité"
               },
               {
                  type: "password", placeholder: "mot de passe",
                  text: `Le mot de passe doit contenir au minimum 2 chiffres, une majusucle au minimumn, 
                           d'un caractére spécial (-, *, ...) et d'une longueur de 8 caractéres minimum.`
               },
               { type: "submit", value: "S'enregistrer" }]} />

            <em>{msg === '' ? null : msg}</em>

            <Link to={"/customer/login"} >Vous avez déjà un compte ?</Link>

         </section>
      </main>
   );
};

export default Logup