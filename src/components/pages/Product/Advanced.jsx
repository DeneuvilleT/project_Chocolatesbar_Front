import { notification, pagination } from '../../../utilities';
import { getCategory, byDatas } from '../../../api/product';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveDetail } from '../../../slices/datasSlices';
import { useEffect } from 'react';

import styles from '../Product/product.module.css';


const Advanced = ({ setPage, setResult, setProducts, max, setMsgNot, setHelp }) => {

   const dispatch = useDispatch();
   const fields   = useRef([]);

   const [origin,   setOrigin] = useState([]);
   const [percent, setPercent] = useState(20);

   useEffect(() => {
      getAllOrigin();
   }, []);
   
   const logInputs = inputElem => {
      if (inputElem && !fields.current.includes(inputElem)) {
         fields.current.push(inputElem);
      };
   };

   // Load Category Origin
   const getAllOrigin = async () => {
      setOrigin([]);
      const res = await getCategory();
      return setOrigin(data => [...data, ...res]);
   };

   // Search product by name / percent / category
   const search = async (e) => {
      e.preventDefault();
      setPage(1);
      setProducts([]);

      const datas = {
         product_name: e.target[0].value,
         percent: +percent,
         category: e.target[2].value
      };
      
      const res = await byDatas(datas);
      if (res.status === 201) {
         setResult(false);
         return notification(setMsgNot, res.data.msg);
      };

      dispatch(saveDetail(datas));
      setResult(true);
      setHelp(false);
      return pagination(res.data.datas, max, setProducts);
   };


   return (
      <>
{/* Form Advanced Search */}
         <hr />

         <form className={styles.product} ref={logInputs} onSubmit={(e) => search(e)} >

            <p>Rechercher par pays d'origine des fêves de cacao ou le poucentage de pâte de cacao. <br />
               Vous pouvez aussi effectuer une recherche par sorte de chocolat ou encore mélanger vos préférences.</p>
            
            <select>
               <option value=''>Toute origine</option>

               {origin?.map((elem) =>
                  <option key={elem.product_name} value={elem.product_name}>
                     {`${elem.product_name.charAt(0).toUpperCase()}${elem.product_name.slice(1)}`}
                  </option>)}
               
            </select>

{/* Display Percent */}
            
            <input onChange={(e) => setPercent(e.target.value)} type="range" min="20" max="100" />
            <label>{percent} %</label>

{/* Display Category */}
            
            <select>
               <option value=''>Tout type de chocolat</option>
               <option value="noir" >Noir</option>
               <option value="au lait">Lait</option>
               <option value="blanc">Blanc</option>
            </select>

            <button type="submit">Lancer la recherche</button>
            
         </form>
      </>
   );
};

export default Advanced;