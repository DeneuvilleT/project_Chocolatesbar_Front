import { Routes, Route } from 'react-router-dom';

import Authentication from './utilities/Authentication';
import Notfound from './components/PageNotFound/Notfound';
import History from './components/History/History';
import Header from './container/Header/Header';
import Footer from './container/Footer/Footer';
import Home from './container/Home/Home';
import Cart from './components/Cart/Cart';

import Customer from './components/pages/Customer/Customer';
import Update from './components/Update/Update';
import Profil from './components/pages/Customer/Profil';
import Login from './components/pages/Customer/Login';
import Logup from './components/pages/Customer/Logup';
import Order from './components/Order/Order';

import Product from './components/pages/Product/Product';
import Search from './components/pages/Product/Search';
import Detail from './components/pages/Product/Detail';
import Admin from './components/Admin/Admin';


const App = () => {

  return (
    <>
      <Header />

      <Routes>
        
        <Route index path="/" element={<Authentication child={Home} />} />
        <Route index path="history" element={<Authentication child={History} />} />
        <Route index path="admin" element={<Authentication child={Admin} auth={true} />} />
        <Route index path="cart" element={<Authentication child={Cart} auth={true} />} />

        <Route path='product' element={<Authentication child={Product} />}>
          <Route path="search" element={<Authentication child={Search} />} />
          <Route path="search/:key" element={<Authentication child={Search} />} />
          <Route path="detail/:id" element={<Authentication child={Detail} auth={true} />} />
        </Route>

        <Route path='customer' element={<Authentication child={Customer} />}>
          <Route path="login" element={<Authentication child={Login} auth={false} />} />
          <Route path="logup" element={<Authentication child={Logup} auth={false} />} />
          <Route path="profil" element={<Authentication child={Profil} auth={true} />} />
          <Route path="order/:id" element={<Authentication child={Order} auth={true} />} />
          <Route path="updateValidate/:email" element={<Authentication child={Update} />} />
        </Route>

        <Route path="notFound" element={<Notfound />} />
        <Route index path="*" element={<Notfound />} />

      </Routes>
      <Footer />
    </>
  );
};

export default App;
