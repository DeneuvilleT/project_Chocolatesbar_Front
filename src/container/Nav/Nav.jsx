import { faBook, faCandyCane, faCartShopping, faHome } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveDetail } from '../../slices/datasSlices';
import { priceTotal } from '../../slices/cartSlices';
import { Link } from 'react-router-dom';

import styles from './nav.module.css';


const Nav = () => {

   const { cart, cartLength } = useSelector((state) => ({ ...state.cart }));

   const dispatch = useDispatch();

   const [screenSize, getDimension] = useState({
      dynamicWidth: window.innerWidth
   });

   useEffect(() => {
      dispatch(priceTotal());
   }, [cart, dispatch]);

   useEffect(() => {
      window.addEventListener('resize', setDimension);
      return (() => {
         window.removeEventListener('resize', setDimension);
      });
   }, [screenSize]);


   const setDimension = () => {
      getDimension({
         dynamicWidth: window.innerWidth
      });
   };


   return (
      <nav className={styles.nav}>
         <Link to={"/"}>{screenSize.dynamicWidth > 650 ? 'Accueil' : <FontAwesomeIcon icon={faHome} />}</Link>
         
         <Link to={"/product/search"} onClick={() => dispatch(saveDetail(null))}>
            {screenSize.dynamicWidth > 650 ? 'Catalogue' : <FontAwesomeIcon icon={faCandyCane} />}
         </Link>

         <Link to={"/history"}>{screenSize.dynamicWidth > 650 ? 'Historique' : <FontAwesomeIcon icon={faBook} />}</Link>

         <Link to={"/cart"}>{screenSize.dynamicWidth > 650 ? 'Panier' : <FontAwesomeIcon icon={faCartShopping} />}
            {cartLength === 0 ? <></> : <span>{cartLength}</span>}</Link>
      </nav>
   );
};

export default Nav;