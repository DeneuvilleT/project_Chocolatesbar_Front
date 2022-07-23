import axios from "axios";
import { URL } from "../utilities";

export const byName = async (key) => {
   try {
      const res = await axios.post(`${URL}/api/v1/product/search`, {key})
      return res;

   } catch (error) {
      return error;
   };
};


export const byDatas = async (datas) => {
   try {
      const res = await axios.post(`${URL}/api/v1/product/search/advanced`, {datas})
      return res;

   } catch (error) {
      return error;
   };
};


export const byId = async (id) => {
   try {
      const res = await axios.post(`${URL}/api/v1/product/search/${id}`)
      return res;

   } catch (error) {
      return error;
   };
};


export const getCategory = async () => {
   try {
      const res = await axios.get(`${URL}/api/v1/product/category`)
      return res.data.category;

   } catch (error) {
      return error;
   };
};
