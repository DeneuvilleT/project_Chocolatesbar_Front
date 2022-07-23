import { faAdd, faArrowLeftLong, faCheck, faLock, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from '../../../utilities';
import { sendComment } from '../../../api/comment';
import { useParams } from 'react-router-dom';
import { byId } from '../../../api/product';

import dayjs from 'dayjs';


const Comment = ({ infos, isLog, setComment }) => {

   const params = useParams();
   const fields = useRef([]);

   const [msg,           setMsg] = useState('');
   const [details,   setDetails] = useState({});
   const [comments, setComments] = useState([]);
   const [add,           setAdd] = useState(false);

   useEffect(() => {
      loadComments(params.id)
   }, [params.id]);

   const logInputs = inputElem => {
      if (inputElem && !fields.current.includes(inputElem)) {
         fields.current.push(inputElem);
      };
   };

   // Load Comments
   const loadComments = async (id) => {
      setComments([]);
      const res = await byId(id);

      if (res.data.comments) {
         setComments(data => [...data, ...res.data.comments]);
      };
      return setDetails(res.data.product);
   };

   // Post New Comment
   const addPost = async (e) => {
      e.preventDefault();

      if (e.target[0].value === '') {
         setAdd(false);
         return notification(setMsg, "Aucun commentaire n'a été posté.");
      };

      const datas = {
         id_product: details.id,
         content: e.target[0].value,
         id_user: infos.id,
      };

      const res = await sendComment(datas, infos.token);
      notification(setMsg, res.data.msg);
      e.target.reset();
      setAdd(false);
      return loadComments(details.id);
   };

   return (
      <>
{/* Display Comments */}

         {comments.length !== 0 ? comments.map((post) =>

            <article key={post.id}>

               <h4>{post.surname} :<br /><span> le {dayjs(post.posted).format('DD MMM YYYY')}</span></h4>
               <p>{post.content}</p>
            </article>) : <p>Aucun commentaire pour cet article.</p>}

{/* Btn Add */}

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <FontAwesomeIcon onClick={() => { setComment(false); setAdd(false) }} icon={faArrowLeftLong} />

            {add ?
               <form ref={logInputs} onSubmit={(e) => addPost(e)}>
                  <textarea autoFocus ></textarea>
                  <button type="submit"><FontAwesomeIcon icon={faCheck} /></button>
               </form> : <></>}


            {isLog ?
               <FontAwesomeIcon title="Ajouter un commentaire"
                  onClick={() => add ? setAdd(false) : setAdd(true)}
                  icon={!add ? faAdd : faMinus} /> :

               <FontAwesomeIcon title="Vous n'êtes pas connecté"
                  onClick={() => notification(setMsg, "Vous devez être connecté pour poster un commentaire.")}
                  icon={faLock} />}
         </div>
         {msg === '' ? <></> : <p className='msg'>{msg}</p>}
      </>
   );
};

export default Comment;