import React from 'react';
import './App.css'

import { Content, Footer, Main, Navbar, Sidebar, Createitem, DeleteItem, UpdateItem } from './components'

export function App() {
    return (
        <>
            <Navbar />
            <Createitem />
            <DeleteItem />
            <UpdateItem />
            <Main />
            {/* <Sidebar />
            <Content />
            <Footer /> */}
        </>
    )
}

export default App