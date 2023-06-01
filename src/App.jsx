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
  SignUp,
  Login,
  NotFound,
  Popular,
  Cart,
  Liked,
  SearchResults,
  Footer,
} from "./components";

export function App() {
  const user = localStorage.getItem("token");

  // const Container
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <CartProvider>
          <Navbar />
          {user && <Header />}

          <div style={{ flex: "1" }}>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route path="/items/:id" element={<ItemDetails />} />
              </Route>
              <Route path="/popularitems" element={<Popular />}>
                <Route path="/popularitems/:id" element={<ItemDetails />} />
              </Route>
              <Route path="/search/:id" element={<SearchResults />} />
              <Route path="/liked" element={<Liked />} />
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
          </div>
          <Footer />
        </CartProvider>
      </div>
    </>
  );
}

export default App;
