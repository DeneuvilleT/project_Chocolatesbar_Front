import {
   deleteComment, deleteProduct, getComments, getCustomers,
   getOrders, getProducts, updateStatusCustomer, updateStatusOrder
} from '../../api/admin';
import {
   removeComment, removeProduct, setAllComments,
   setAllCustomers, setAllOrders, setAllProducts
} from '../../slices/datasSlices';
import { faBagShopping, faCandyCane, faComments, faTrash, faUpRightFromSquare, faUsers, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { URL_LOCAL, notification } from '../../utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { byName } from '../../api/product';
import { Link } from 'react-router-dom';

import AddProd from './AddProd';
import styles from '../Admin/admin.module.css';
import dayjs from 'dayjs';


const Admin = ({ infos }) => {

   const { orders, comments, products, customers } = useSelector((state) => ({ ...state.datas }));

   const dispatch = useDispatch();

   const [listCustomer, setListCustomer] = useState(false);
   const [listComment,   setListComment] = useState(false);
   const [listProduct,   setListProduct] = useState(false);
   const [listOrder,       setListOrder] = useState(false);
   const [all,                   setAll] = useState(false);
   const [add,                   setAdd] = useState(false);
   const [msg,                   setMsg] = useState('');


   const recupDatas = async (getDatas, setDatas) => {
      setAdd(false);
      setAll(false);
      const res = await getDatas(infos.token);
      return dispatch(setDatas(res.data.datas));
   };

   // Add Product
   const sendDatas = async (e, item, updateStatus, getDatas, setAllDatas) => {
      e.preventDefault();
      const datas = {
         customers: e.target.value,
         id: item.id
      };

      const res = await updateStatus(infos.token, datas);
      notification(setMsg, res.data.msg);
      return recupDatas(getDatas, setAllDatas);
   };

   const deleteItem = async (id, deleteData) => {
      const res = await deleteData(infos.token, id);
      return notification(setMsg, res.data.msg);
   };

   // Search product by name
   const search = async (e) => {
      setAll(false);
      setAdd(false);
      dispatch(setAllProducts([]));
      const res = await byName(e.target.value);
      setAll(true);
      return dispatch(setAllProducts(res.data.datas));
   };


   return (
      <main className={styles.admin} >
         <h1>Vous êtes sur votre panneau d'administration.</h1>
         <h2>Ici vous pouvez modifier le statut des commandes, le rôle de chaque utilisateur et rajouter ou supprimer des produits.</h2>

{/* Choice Cards */}

         <section>
            <FontAwesomeIcon icon={faCandyCane} title="Afficher les produits"
               onClick={() => {
                  setListProduct(true);
                  setListComment(false); setListOrder(false); setListCustomer(false)
               }} />

            <FontAwesomeIcon icon={faComments} title="Afficher les commentaires"
               onClick={() => {
                  recupDatas(getComments, setAllComments); setListComment(true);
                  setListProduct(false); setListOrder(false); setListCustomer(false)
               }} />

            <FontAwesomeIcon icon={faBagShopping} title="Afficher les commandes"
               onClick={() => {
                  recupDatas(getOrders, setAllOrders); setListOrder(true);
                  setListProduct(false); setListComment(false); setListCustomer(false)
               }} />

            <FontAwesomeIcon icon={faUsers} title="Afficher les utilisateurs"
               onClick={() => {
                  recupDatas(getCustomers, setAllCustomers); setListCustomer(true);
                  setListProduct(false); setListComment(false); setListOrder(false)
               }} />
         </section>

{/* List Customers */}
         
         <section>

            {listCustomer && <ul>  {customers?.map(customer =>
               <li key={customer.id} style={{ width: "320px" }}>

                  <h3>{customer.lastname === null ? customer.surname : customer.lastname} {customer.firstname}</h3>
                  <p>Rôle : {customer.status === 'admin' ? 'Administrateur' : 'Client'}</p>

                  <select onChange={(e) => sendDatas(e, customer, updateStatusCustomer, getCustomers, setAllCustomers)}>
                     <option disabled selected >&nbsp; ...statut</option>
                     <option value='customer'>Client</option>
                     <option value='admin'>Administrateur</option>
                  </select>
               </li>)}
            </ul>}

{/* List Orders */}
            
            {listOrder && <ul> {orders?.map(order =>
               <li key={order.id} style={{ width: "320px" }}>

                  <h3>Commande numéro : {order.id}</h3>
                  <p>Statut : <b>{order.status}</b></p>
                  <p>le : {dayjs(order.order_date).format('DD MMM YYYY')}</p>

                  <select onChange={(e) => sendDatas(e, order, updateStatusOrder, getOrders, setAllOrders)}>
                     <option disabled selected >&nbsp;...statut</option>
                     <option value='en cours de préparation'>en cours de préparation</option>
                     <option value='en transition chez le client'>en transition chez le client</option>
                     <option value='commande terminée'>commande terminée</option>
                  </select>

                  <FontAwesomeIcon icon={faUpRightFromSquare}
                     onClick={() => window.open(`${URL_LOCAL}/customer/order/${order.id}`)} />
               </li>)}
            </ul>}

{/* List Comments */}

            {listComment && <ul> {comments?.map((post) =>
               <li key={post.id}>

                  <p style={{ width: '100%', fontSize: '2rem' }}>{post.content}</p>
                  <h4 style={{ width: "45%" }}>{post.surname} :<br />
                     <em> le {dayjs(post.posted).format('DD MMM YYYY')}</em>
                  </h4>

                  <FontAwesomeIcon icon={faTrash} title="Afficher les utilisateurs"
                     size='2x' onClick={() => { dispatch(removeComment(post)); deleteItem(post.id, deleteComment) }} />
               </li>)}
            </ul>}

{/* List Products */}

            {listProduct && <>
               <button onClick={() => { !add ? setAdd(true) : setAdd(false); setAll(false) }}>Ajouter un produit</button>
               <input placeholder='rechercher par nom ...' autoFocus onChange={(e) => search(e)} type="text" />
               <button onClick={() => { recupDatas(getProducts, setAllProducts); setAll(true); setAdd(false) }}>Afficher tous les produits</button>


               {all && (<><ul style={{ width: "90%", gap: '1vw' }}> {products?.map((product) =>
                  <li key={product.id} style={{ width: "100%" }}>

                     <Link style={{ width: "35%" }} to={`/product/detail/${product.id}`}>{product.product_name}</Link>
                     <em style={{ width: "35%" }}>{product.factory}</em>
                     <b>{product.percent.toFixed(2)} %</b>

                     <FontAwesomeIcon icon={faTrash} title="Afficher les utilisateurs" size='2x'
                        onClick={() => { dispatch(removeProduct(product)); deleteItem(product.id, deleteProduct) }} />
                  </li>)}
               </ul></>)}
            </>}
         </section>

{/* Form Add Product */}
         {add && (<AddProd infos={infos} setAdd={setAdd} setMsg={setMsg} />)}

         {msg === '' ? <></> : <p className='msg'><FontAwesomeIcon icon={faTriangleExclamation} size='2x' /> {msg}</p>}
      </main>
   );
};

export default Admin;