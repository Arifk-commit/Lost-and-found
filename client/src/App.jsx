import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Signup from "./Components/SignupModern.jsx"; // Using modern signup
import Login from "./Components/LoginModern.jsx"; // Using modern login
import LostItems from "./Components/LostItemsModern.jsx"; // Using modern lost items
import FoundItems from "./Components/FoundItemsModern.jsx"; // Using modern found items
import Home from "./Components/HomeModern.jsx"; // Using modern home
import ItemPage from "./Components/ItemPage.jsx";
import LostItem from "./Components/LostItemModern.jsx"; // Using modern post item
import MyListings from "./Components/MyListingsModern.jsx"; // Using modern my listings
import Layout from "./layout.jsx"; 
window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;
function App() {
 
  
  return (
      <BrowserRouter>
          <Layout>
          <Routes>

          <Route path="/" element={<Home />}  />
          <Route path="/log-in" element={<Login/>} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/lostitems" element={<LostItems/>} />
          <Route path="/founditems" element={<FoundItems/>} />
          <Route path="/postitem" element={<LostItem/>} />
          <Route path="/mylistings" element={<MyListings/>} />
          <Route path="/:item" element={<ItemPage/>} />
          <Route path="/*" element={<Home/>} />
          </Routes>
          <ToastContainer />
          </Layout>
      </BrowserRouter>

  );
}

export default App;
