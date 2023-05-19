import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import {
  Header,
  Main,
  Navbar,
  Createitem,
  DeleteItem,
  UpdateItem,
} from "./components";

export function App() {
  return (
    <Router>
        <Routes>
            <Route path="/home" element={<><Navbar /><Header /><Main /></>} />
            <Route path="/createitem" element={ <Createitem/> }/>
            <Route path="/deleteitem" element={ <DeleteItem/> }/>
            <Route path="/updateitem" element={ <UpdateItem/> }/>
        </Routes>
    </Router>
  );
}

export default App;
