import React from "react";
import { Route, Routes, Router, useParams } from "react-router-dom";
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
  Login
} from "./components";

export function App() {
  return (
    <>
      <Navbar />
      {/* <Header /> */}
      {/*//? Will always render, regardless of the route.*/}

      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/items/:id" element={<ItemDetails />} />
        </Route>
        <Route path="/createitem" element={<Createitem />} />
        <Route path="/deleteitem" element={<DeleteItem />} />
        <Route path="/updateitem" element={<UpdateItem />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/items" element={<Main />} /> */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
