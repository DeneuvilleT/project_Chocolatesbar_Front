import { faCartShopping, faAddressCard, faUpRightFromSquare, faCamera } from '@fortawesome/free-solid-svg-icons';
import { notification, URL, URL_LOCAL, valueOk } from '../../../utilities';
import { loadDatas, addNewPicture, saveNewPicture, updateInfos } from '../../../api/user';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setAllOrders } from '../../../slices/datasSlices';
import { update } from '../../../slices/authSlices';

import noPicture from '../../../assets/no_photo.png';
import Notfound from '../../PageNotFound/Notfound';
import AddForm from '../../AddForm/AddForm';
import styles from '../Customer/customer.module.css';
import dayjs from 'dayjs';


const Profil = ({ infos, isLog }) => {

  const { orders } = useSelector((state) => ({ ...state.datas }));

  const file = useRef();

  const [msg,         setMsg] = useState('');
  const [photo,     setPhoto] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [modif,     setModif] = useState(false);
  const [pick,       setPick] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (infos.token) checkOrder();
  }, [infos.token]);

  // Load Order
  const checkOrder = async () => {
    const res = await loadDatas(infos.id, infos.token)
    return dispatch(setAllOrders(res.data.orders));
  };

  // Picture Profile
  const changePicture = async () => {
    const res = await addNewPicture(file.current.files[0]);
    return setImgFile(`${URL}/public/images/${res.data.url}`);
  };

  const savePicture = async (e) => {
    e.preventDefault();
    setPick(false);
    const res = await saveNewPicture(imgFile, infos.id, infos.token);
    setPick(false);

    const updateUser = res.data.newDatas;
    updateUser.token = infos.token
    dispatch(update(updateUser));
    return notification(setMsg, res.data.msg);
  };

  // Update Datas User
  const updateDatas = async (e) => {
    e.preventDefault();

    if (!e.target[1].value.match(valueOk) && e.target[1].value === "") {
      return notification(setMsg, 'Le mot de passe ne correspond pas aux exigences.');
    };

    const datas = {
      email:     e.target[0].value === "" ? infos.email     : e.target[0].value,
      password:  e.target[1].value === "" ? infos.password  : e.target[1].value,
      firstname: e.target[2].value === "" ? infos.firstname : e.target[2].value,
      lastname:  e.target[3].value === "" ? infos.lastname  : e.target[3].value,
      address:   e.target[4].value === "" ? infos.address   : e.target[4].value,
      city:      e.target[5].value === "" ? infos.city      : e.target[5].value,
      zip_code:  e.target[6].value === "" ? infos.zip_code  : +e.target[6].value,
      phone:     e.target[7].value === "" ? infos.phone     : +e.target[7].value
    };

    if (infos.password === datas.password) delete datas.password;

    const res = await updateInfos(datas, infos.id, infos.token);
    if (res.status === 200) {
      setModif(false);

      const updateUser = res.data.newDatas;
      updateUser.token = infos.token
      dispatch(update(updateUser));
      return notification(setMsg, res.data.msg);
    };
  };


  return (
    <main className={styles.customer} >

  {/* Banner */}

      {isLog ? <><h1>Bienvenue sur ta page de profil {infos.firstname}</h1>
        <div>
          <figure>

            <img src={infos.picture || noPicture}
              onClick={() => !pick ? setPick(true) : setPick(false)}
              onLoad={(e) => setPhoto(e.target.height)} width={photo}
              alt="photo de profil" title="Modifier votre photo de profil" />

            <FontAwesomeIcon icon={faCamera} title="Modifier votre photo de profil" size="2x"
              onClick={() => !pick ? setPick(true) : setPick(false)} />

            {!pick ? <></> :
              <form onSubmit={(e) => savePicture(e)} >
                <input onInput={changePicture} ref={file} type="file" />
                <input type="submit" value="Enregistrer" />
              </form>}

          </figure>
        </div>

        <div>
          <h4>vos coordonées</h4><hr />
          <FontAwesomeIcon icon={faAddressCard} size="2x" />
        </div>

{/* Datas User */}

        {!modif ?
          <section title='Modifier vos coordonnées' onClick={() => !modif ? setModif(true) : setModif(false)} >

            <p>{infos.email}</p><p>*************</p>
            <div>
              <p>{infos.firstname === null ? 'Prénom non spécifié' : infos.firstname}</p>
              <p>{infos.lastname === null ? 'Nom non spécifié' : infos.lastname}</p>
            </div>
            <p>{infos.address === null ? 'Adresse non spécifié' : infos.address}</p>
            <div>
              <p>{infos.city === null ? 'Ville non spécifié' : infos.city}</p>
              <p>{infos.zip_code === null ? 'Code Postal non spécifié' : infos.zip_code}</p>
            </div>
            <p>{infos.phone === null ? 'Téléphone non spécifié' : `0${infos.phone}`}</p>

          </section> :

// Form Datas User 

          <AddForm onsubmit={(e) => updateDatas(e)} inputs={[
            { type: "text",     placeholder:                   infos.email    },
            { type: "password", placeholder:                  '**********'    },
            { type: "text",     placeholder: infos.firstname || 'prénom'      },
            { type: "text",     placeholder: infos.lastname  || 'nom'         },
            { type: "text",     placeholder: infos.address   || 'adresse'     },
            { type: "text",     placeholder: infos.city      || 'ville'       },
            { type: "number",   placeholder: infos.zip_code  || 'code postal' },
            { type: "phone",    placeholder: infos.phone     || 'téléphone'   },
            { type: "submit",   value: "Enregistrer" }]} />}

        <em>{msg === '' ? null : msg}</em>

        <div>
          <h4>vos commandes</h4><hr />
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
        </div>

{/* Display Order */}

        <section>

          {orders.length ? orders?.map(order =>

            <article key={order.id} onClick={() => window.open(`${URL_LOCAL}/customer/order/${order.id}`)}>

              <h3>Commande numéro : {order.id}</h3>
              <p>{order.status}</p>
              <p>{dayjs(order.order_date).format('DD MMM YYYY')}</p>
              <FontAwesomeIcon icon={faUpRightFromSquare} />

            </article>) : <h2>Vous n'avez pas encore passé de commande.</h2>}

        </section></> : <Notfound />}
    </main>
  );
};

export default Profil;