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
} from "./components";

export function App() {
  return (
    <>
      <Navbar />
      <Header />
      {/*//? Will always render, regardless of the route.*/}

      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/items/:id" element={<ItemDetails />} />
        </Route>
        <Route path="/createitem" element={<Createitem />} />
        <Route path="/deleteitem" element={<DeleteItem />} />
        <Route path="/updateitem" element={<UpdateItem />} />
        {/* //! Item links */}

        {/* <Route path="items/:id" element={<ItemDetails />} /> */}
        {/* //! 404 */}
        <Route path="*" element={<h1>Not found</h1>} /> //! Necesito hacer esto en el server, ya que esto es 404 SOFT, pero el server status no es 404.
      </Routes>
    </>
  );
}

export default App;
