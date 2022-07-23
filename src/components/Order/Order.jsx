import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOrder } from '../../slices/datasSlices';
import { detailOrder } from '../../api/user';

import styles from '../Order/order.module.css';
import dayjs from 'dayjs';
import feve from '../../assets/feve.png';


const Order = ({ infos }) => {

   const { order } = useSelector((state) => ({ ...state.datas }));

   const params = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      displayOrder(params.id);
   }, [infos]);


   const displayOrder = async (id) => {
      if (infos.token) {
         const res = await detailOrder(id, infos.token);
         return dispatch(getOrder(res.data.order));
      };
   };

   return (
      <main className={styles.order} >
         {order.length ? <section>

            <section>
               <img src={feve} alt="feve" />
               <div>
                  <h1>Commande n° {order[0].id_order}</h1>
                  <p>Enregistrée le {dayjs(order[0].order_date).format('DD / MM / YYYY')}</p>
               </div>
            </section>

            <address>
               <p><span>{infos.lastname}</span>&nbsp;<span>{infos.firstname}</span></p>
               <p>{infos.address}</p>
               <p><span>{infos.city}</span>&nbsp;<span>{infos.zip_code}</span></p>
               <p>{infos.email}</p>
            </address>

            <div>
               <h4>Dénomination</h4>
               <h4>Quantité</h4>
               <h4>Prix unitaire</h4>
               <h4>Sous total</h4>
            </div>

            <section>
               {order.map((elem) =>
                  <article key={elem.id} >
                     <h3>{elem.product_name}</h3>
                     <p>{elem.quantity}</p>
                     <p>{(elem.price_each).toFixed(2)} €</p>
                     <p>{(elem.quantity * elem.price_each).toFixed(2)} €</p>
                  </article>
               )}
            </section>

            <section>
               <h3>Total : {order[0].total.toFixed(2)} €</h3>
            </section>

         </section> : <section>Chargement</section>}
      </main>
   );
};

export default Order;
