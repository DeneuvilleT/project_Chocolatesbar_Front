import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from "react";

const Customer = ({ isLog }) => {

  const navigate = useNavigate();
  const location = useLocation();

  // Security routing
  useEffect(() => {
    if (isLog && location.pathname === "/customer/profil") navigate("profil");
  }, [isLog]);

  useEffect(() => {
    if (location.pathname === "/customer") navigate("/notFound");
  }, [location]);

  return (
    <>
      {!isLog && (<></>)}
      <Outlet />
    </>
  );

};

export default Customer;