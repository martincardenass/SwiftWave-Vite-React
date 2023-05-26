import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CartProvider } from "./components/context/cart";
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
  NotFound,
  Popular,
  Cart,
} from "./components";

export function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    {/* Envolviendo esto en el contexto de CartProvider */}
      <CartProvider> 
        <Navbar />
        {user && <Header />}

        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/items/:id" element={<ItemDetails />} />
          </Route>
          <Route path="/popularitems" element={<Popular />}>
            <Route path="/popularitems/:id" element={<ItemDetails />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/createitem"
            element={user ? <Createitem /> : <Navigate to="/" />}
          />
          <Route
            path="/deleteitem"
            element={user ? <DeleteItem /> : <Navigate to="/" />}
          />
          <Route
            path="/updateitem"
            element={user ? <UpdateItem /> : <Navigate to="/" />}
          />
          {
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
          }
          {
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
