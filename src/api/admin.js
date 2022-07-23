import axios from "axios";
import { URL } from "../utilities";


export const getProducts = async (token) => {
   try {
      const res = await axios.get(`${URL}/api/v1/admin/get_all_products`, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const getCustomers = async (token) => {
   try {
      const res = await axios.get(`${URL}/api/v1/admin/get_all_customers`, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const getComments = async (token) => {
   try {
      const res = await axios.get(`${URL}/api/v1/admin/get_all_comments`, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const getOrders = async (token) => {
   try {
      const res = await axios.get(`${URL}/api/v1/admin/get_all_orders`, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const updateStatusCustomer = async (token, data) => {
   try {
      const res = await axios.put(`${URL}/api/v1/admin/update_customer`, { data }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const updateStatusOrder = async (token, data) => {
   try {
      const res = await axios.put(`${URL}/api/v1/admin/update_order`, { data }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const deleteComment = async (token, id) => {
   try {
      const res = await axios.post(`${URL}/api/v1/admin/delete_comment`, { id }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const deleteProduct = async (token, id) => {
   try {
      const res = await axios.post(`${URL}/api/v1/admin/delete_product`, { id }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

export const addProduct = async (token, datas) => {
   try {
      const res = await axios.post(`${URL}/api/v1/admin/add_product`, { datas }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};

