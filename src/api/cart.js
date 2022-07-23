import axios from "axios";
import { URL } from "../utilities";

export const setOrder = async (id, token) => {
   try {
      const res = await axios.post(`${URL}/api/v1/cart/finalise_order/${id}`, {}, {
         headers: { "x-acess-token": token }
      });

      return res;

   } catch (error) {
      return error;
   };
};


export const setOrderDetails = async (datas, token) => {
   try {
      const res = await axios.post(`${URL}/api/v1/cart/finalise_cart_detail`, { datas }, {
         headers: { "x-acess-token": token }
      });
      return res;

   } catch (error) {
      return error;
   };
};


export const sendPay = async (datas) => {
   try {
      const res = await axios.post(`${URL}/api/v1/cart/checkout`, { datas }, {
         headers: { "Content-Type": "application/json" }
      });
      return res;

   } catch (error) {
      return error;
   };
};
