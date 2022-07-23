import { faAnglesLeft, faAnglesRight, faArrowDownWideShort, faMagnifyingGlass, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { notification, pagination } from '../../../utilities';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byDatas, byName } from '../../../api/product';
import { addToCart } from '../../../slices/cartSlices';
import { useEffect } from 'react';

import Bar from '../../Bar/Bar';
import styles from '../Product/product.module.css';
import Advanced from './Advanced';


const Search = () => {

   const { history } = useSelector((state) => ({ ...state.datas }));

   const fields = useRef([]);
   const params = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [result,     setResult] = useState(false);
   const [help,         setHelp] = useState(false);
   const [products, setProducts] = useState([]);
   const [msg,           setMsg] = useState('');
   const [msgNot,     setMsgNot] = useState('');
   const [max,           setMax] = useState(10);
   const [page,         setPage] = useState(1);

   useEffect(() => {
      if (history !== null) {
         readHistory(byDatas, history);
         return
      } else if (params.key) {
         readHistory(byName, params.key);
         return
      };
   }, []);

   const logInputs = inputElem => {
      if (inputElem && !fields.current.includes(inputElem)) {
         fields.current.push(inputElem);
      };
   };

   // Read history search by arrow back from Detail.jsx 
   const readHistory = async (byKey, key) => {
      const res = await byKey(key);
      setHelp(false);
      setResult(true);
      return pagination(res.data.datas, max, setProducts);
   };

   // Search product by name
   const search = async (e) => {
      e.preventDefault();
      setPage(1);
      setProducts([]);

      const res = await byName(e.target[0].value);
      if (res.status === 201) {
         return notification(setMsgNot, res.data.msg);
      };
      setResult(true);
      return pagination(res.data.datas, max, setProducts);
   };


   return (
      <main className={styles.product}>

         <section>
            <div>
               <h1>Connaissez-vous le nom de votre gourmandise ?</h1>
               <cite>Exemple: Tanzania, Costa Rica, Dominican Republic ...</cite>
            </div>

{/* Search Bar */}

            <form ref={logInputs} onSubmit={(e) => search(e)}>
               <input autoFocus type="text" />
               <button onClick={() => setHelp(false)} type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size='2x' />
               </button>
            </form>

            <button onClick={() => { !help ? setHelp(true) : setHelp(false); setResult(false) }}
               title='Afficher la recherche avancée'>Besoin d'aide ? &nbsp;
               <FontAwesomeIcon icon={faArrowDownWideShort} size='1x' />
            </button>

            <em>{msgNot === '' ? null : msgNot}</em>
         </section>

{/* Advanced Search */}

         {help && (<Advanced setPage={setPage} setResult={setResult} setProducts={setProducts}
            setMsgNot={setMsgNot} max={max} setHelp={setHelp} />)}

{/* Display Result */}

         {result ? <>

            <section>
               {products[page - 1]?.map((product) =>
                  <article key={product.id} >

                     <Bar onclick={() => navigate(`/product/detail/${product.id}`)}
                        percent={product.percent}
                        title={product.product_name}
                        category={product.category}
                        factory={product.factory}
                        item={product} />

                     <FontAwesomeIcon title='Ajouter à votre panier'
                        onClick={() => {
                           dispatch(addToCart(product));
                           notification(setMsg, `Vous avez ajouté 
                              ${product.product_name.charAt(0).toUpperCase()}${product.product_name.slice(1)} 
                              ${product.percent.toFixed(2)} % à votre panier !`)
                        }} icon={faCartArrowDown} size='2x' />

                  </article>)}
            </section>

{/* Arrow Navigation */}

            <div>
               <FontAwesomeIcon size='2x' title='Page précédente'
                  onClick={() => page > 1 ? setPage(page - 1) : setPage(page)} icon={faAnglesLeft} />
               <p>Page {page} sur {products.length}</p>
               <FontAwesomeIcon size='2x' title='Page suivante'
                  onClick={() => page <= products.length - 1 ? setPage(page + 1) : setPage(page)} icon={faAnglesRight} />
            </div> </> : <></>}

         {msg === '' ? <></> : <p className='msg'><FontAwesomeIcon icon={faCartArrowDown} size='2x' /> {msg}</p>}
      </main>
   );
};

export default Search;