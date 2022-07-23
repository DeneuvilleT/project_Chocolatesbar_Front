import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { checkAuth } from "../api/user";
import { login } from "../slices/authSlices";

const Authentication = (props) => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const params = useParams();

   const { isLog, infos } = useSelector((state) => ({
      ...state.datas, ...state.auth
   }));

   const Child = props.child;

   useEffect(() => {
      checkLog();
   }, [props]);


   if (isLog && location.pathname === "/admin" && infos.status !== "admin") {
      return navigate("/notFound")
   };

   // Check token and distrib datas user
   const checkLog = async () => {
      if (isLog === false) {
         const token = localStorage.getItem("TOKEN");

         if (token !== null) {
            const res = await checkAuth(token);

            if (res.status === 200) {
               const user = res.data.datas;
               user.token = token;
               dispatch(login(user));
               return

            } else {
               console.log("Pas de données");
            };
         } else if (location.pathname === "/admin") {
            return navigate("/notFound");
         };
      };
   };


   return (
      <Child params={params} infos={infos} isLog={isLog} />
   );
};

export default Authentication;