import { notification } from '../../../utilities';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../api/user';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AddForm from '../../AddForm/AddForm';
import styles from '../Customer/customer.module.css';


const Login = () => {

   const navigate = useNavigate();
   const [msg, setMsg] = useState('');

   const signin = async (e) => {
      e.preventDefault();

      if (!e.target[0].value || !e.target[1].value) {
         return notification(setMsg, 'Tous les champs doivent être remplis.');
      };

      const datas = {
         email:    e.target[0].value,
         password: e.target[1].value,
      };

      const res = await loginUser(datas);

      if (res.status === 200) {
         if (res.data.datas.status === "admin") {
            localStorage.setItem("TOKEN", res.data.token)
            return navigate("/admin");

         };
         localStorage.setItem("TOKEN", res.data.token)
         return navigate("/");

      };
      return notification(setMsg, res.response.data.msg);
   };


   return (
      <main className={styles.login} >
         <h1>Connexion</h1>

         <section>

            <AddForm onsubmit={(e) => signin(e)} inputs={[
               {
                  type: "email", placeholder: "email",
                  text: "Votre adresse mail :"
               },
               {
                  type: "password", placeholder: "mot de passe",
                  text: "Votre mote de passe :"
               },
               { type: "submit", value: "Se connecter" },
            ]} />

            <em>{msg === '' ? null : msg}</em>

            <Link to={"/customer/logup"} >Nouveau sur le site ?</Link>

         </section>
      </main>
   );
};

export default Login;
