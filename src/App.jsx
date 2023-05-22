import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import {
  Header,
  Main,
  Navbar,
  Createitem,
  DeleteItem,
  UpdateItem,
  ItemDetails,
  ItemCard,
  SignUp,
  Login,
} from "./components";

export function App() {
  const user = localStorage.getItem('token')
  return (
    <>
      <Navbar />

      <Routes>
        {user &&<Route path="/" element={<Main />}>
          <Route path="/items/:id" element={<ItemDetails />} />
        </Route>}
        <Route path="/createitem" element={<Createitem />} />
        <Route path="/deleteitem" element={<DeleteItem />} />
        <Route path="/updateitem" element={<UpdateItem />} />
        {<Route path="/signup" element={user ? <Navigate to= '/'/> : <SignUp />} />}
        {<Route path="/login" element={user ? <Navigate to= '/'/> : <Login /> } />}
        <Route path="*" element={<h1>Log in first</h1>} />
      </Routes>
    </>
  );
}

export default App;
