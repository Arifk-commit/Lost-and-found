import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import LostItems from "./Components/LostItems.jsx";
import FoundItems from "./Components/FoundItems.jsx";
import Home from "./Components/Home.jsx";
import ItemPage from "./Components/ItemPage.jsx";
import LostItem from "./Components/Lost_item.jsx";
import MyListings from "./Components/MyListings.jsx";
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
