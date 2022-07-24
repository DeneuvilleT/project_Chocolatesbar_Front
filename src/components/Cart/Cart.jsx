import { faClockRotateLeft, faCartFlatbedSuitcase, faShieldHeart, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { removeToCart, lessQuantity, addQuantity, clearCart, priceTotal } from '../../slices/cartSlices';
import { faMinusSquare, faPlusSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { setOrder, setOrderDetails, sendPay } from '../../api/cart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { notification, stripePromise } from '../../utilities';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Elements } from '@stripe/react-stripe-js';

import Checkout from '../CheckOut/CheckOut';
import styles from './cart.module.css';


const Cart = ({ infos, isLog }) => {

   const { cart, cartTotal } = useSelector((state) => ({ ...state.cart }));

   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [clientSecret, setClientSecret] = useState("");
   const options = {
      clientSecret,
      appearance: { theme: "stripe" }
   };

   const [free, setFree] = useState(false);
   const [tax,   setTax] = useState(6.50);
   const [msg,   setMsg] = useState('');

   useEffect(() => {
      dispatch(priceTotal());
   }, [cart, dispatch]);
   
   useEffect(() => {
      if ((cartTotal) >= 50) {
         setFree(true);
         setTax(0);
      } else {
         setTax(6.50);
         setFree(false);
      };
   }, [cartTotal]);
   
   useEffect(() => {
      setTimeout(() => {
         if (location.search.includes("succeeded")) {
            notification(setMsg, "Paiement effectué.");
            finishBuying();
            navigate('/cart');
         };
      },500)
   }, [infos]);


   const payment = async () => {
      const pay = await sendPay(!free ? (cartTotal + tax).toFixed(2) : cartTotal.toFixed(2));
      return setClientSecret(pay.data.clientSecret);
   };

   const finishBuying = async () => {
      if (infos.token) {
         const res = await setOrder(infos.id, infos.token);
         const genrate = await cart.forEach((item) => {
          setOrderDetails({
             id_product: item.id,
             item_quantity: item.item_quantity,
             price_each: item.price,
             total: !free ? (cartTotal + tax).toFixed(2) : cartTotal.toFixed(2),
             id_order: res.data.idOrder,
          }, infos.token);
       });
         notification(setMsg, res.data.msg);
         return dispatch(clearCart());
      };
   };


   return (
      <main className={styles.cart}>
         <h1>Récapitulatif de votre panier</h1>
         {cart.length === 0 ?
            <section>
               <h2>Votre panier est vide pour l'instant ...</h2>
            </section> : <>
               
{/* Diplay Items */}
               
               <section>

                  <section>

                     {cart?.map(item => (

                        <article key={item.id}>
                           <Link to={`/product/detail/${item.id}`}>{item.product_name}</Link>
                           <div>

                              {/* Add / Less Quantity Item */}
                              <div>
                                 <FontAwesomeIcon icon={faMinusSquare}
                                    onClick={() => {
                                       dispatch(lessQuantity(item));
                                       notification(setMsg, "Vous avez retiré un article !")
                                    }} />
                                 <p>{item.item_quantity}</p>
                                 <FontAwesomeIcon icon={faPlusSquare}
                                    onClick={() => {
                                       dispatch(addQuantity(item));
                                       notification(setMsg, "Vous avez ajouté un article !")
                                    }} />
                              </div>

                              <p>{item.price.toFixed(2)} €</p>

                              {/* Delete Item */}
                              <div>
                                 <FontAwesomeIcon icon={faTrashCan} size="2x"
                                    onClick={() => {
                                       dispatch(removeToCart(item));
                                       notification(setMsg, `Vous avez retiré 
                                       ${item.product_name.charAt(0).toUpperCase()}${item.product_name.slice(1)} à votre panier !`)
                                    }} />
                                 <p>{(item.price * item.item_quantity).toFixed(2)} €</p>
                              </div>

                           </div>
                        </article>))}

                     {/* Clear Cart */}
                     <button onClick={() => {
                        dispatch(clearCart());
                        notification(setMsg, "Votre panier a été vidé !")
                     }}>Vider le panier</button>

                  </section>

{/* Price / Infos */}
                  
                  <section>
                     <aside>
                        <h4>Vos achats<span>{cartTotal.toFixed(2)} €</span></h4>
                        <h4>Livraison{!free ? <span>{tax.toFixed(2)} €</span> :
                           <span style={{ color: "green", letterSpacing: "1px" }}>offerte !</span>}</h4>
                        <hr />
                        <h4>Total<span>{(cartTotal + tax).toFixed(2)} €</span></h4>

                        {isLog ? <> <button onClick={() => payment()} >Valider le panier</button> </>
                           : <> <Link to={'/customer/login'}>Vous devez être connecté pour finaliser votre achat</Link>
                              <h2 >Total {cartTotal.toFixed(2)} €</h2> </>}
                     </aside>

                     <aside>
                        <div>
                           <FontAwesomeIcon icon={faClockRotateLeft} size="4x" />
                           <p>Livraison en 24h</p>
                        </div>
                        <div>
                           <FontAwesomeIcon icon={faCartFlatbedSuitcase} size="4x" />
                           <p>Frais de port offert à partir de 50 €</p>
                        </div>
                        <div>
                           <FontAwesomeIcon icon={faShieldHeart} size="4x" />
                           <p>Paiement sécurisé</p>
                        </div>
                     </aside>

                  </section>

               </section></>}
         
         {msg && (<p className='msg'><FontAwesomeIcon icon={faCartArrowDown} size='2x' /> {msg}</p>)}

{/* Payment */}
         
         {clientSecret && ( cart.length ? 
            <section>
               <Elements options={options} stripe={stripePromise}>
                  <Checkout />
               </Elements>
            </section>:<></>)}
      </main>
   );
};

export default Cart;