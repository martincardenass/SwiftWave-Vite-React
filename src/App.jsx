import React from 'react';
import './App.css'

import { Content, Footer, Header, Main, Navbar, Sidebar, Createitem, DeleteItem, UpdateItem } from './components'

export function App() {
    return (
        <>
            <Navbar />
            {/* <Header /> */}
            <Createitem />
            <DeleteItem />
            <UpdateItem />
            <Main>
            </Main>
            <Sidebar />
            <Content />
            <Footer />
        </>
    )
}

export default App