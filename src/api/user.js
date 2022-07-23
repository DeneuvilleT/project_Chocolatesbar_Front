import axios from 'axios';
import { URL } from '../utilities';

export const checkAuth = async (token) => {
   try {
      const res = await axios.get(`${URL}/api/v1/check/auth`, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};


export const loginUser = async (datas) => {
   try {
      const res = await axios.post(`${URL}/api/v1/customer/signin`, datas);
      return res;

   } catch (error) {
      return error;
   };
};


export const logupNewUser = async (datas) => {
   try {
      const res = await axios.post(`${URL}/api/v1/customer/signup`, datas);
      return res;

   } catch (error) {
      return error;
   };
};


export const loadDatas = async (id, token) => {
   try {
      const res = await axios.get(`${URL}/api/v1/customer/load/${id}`, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};


export const updateInfos = async (datas, id, token) => {
   try {
      const res = await axios.patch(`${URL}/api/v1/customer/update/${id}`, { datas }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};


export const validateAccount = async (mail) => {
   try {
      const res = await axios.get(`${URL}/api/v1/customer/updateValidate/${mail}`);
      return res;

   } catch (error) {
      return error;
   };
};


export const addNewPicture = async (file) => {
   try {

      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`${URL}/api/v1/customer/picture`, formData);
      return res;

   } catch (error) {
      return error;
   };
};


export const saveNewPicture = async (data, id, token) => {
   try {
      const res = await axios.post(`${URL}/api/v1/customer/update/picture/${id}`, { data }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};


export const detailOrder = async (id, token) => {
   try {
      const res = await axios.post(`${URL}/api/v1/customer/order/${id}`, { id }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};
