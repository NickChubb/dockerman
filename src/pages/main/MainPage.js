import React from 'react';
import Header from './Header'
import Footer from './Footer';
import MainRoutes from './MainRoutes';

// Import main css
import './main.css';

const MainPage = () => {
    return (
        <div className='main-page'>
            <Header />
            <MainRoutes />
            <Footer />
        </div>
    )
}

export default MainPage;
