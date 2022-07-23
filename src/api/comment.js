import axios from 'axios';
import { URL } from '../utilities';

export const sendComment = async (datas, token) => {
   try {
      const res = await axios.post(`${URL}/api/v1/comment/post/${datas.id}`, { datas }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};
