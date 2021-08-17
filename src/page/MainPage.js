import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Display from '../components/screens/Display.js';

const MainPage = () => {
    return (
        <>
            <Header />
            <div className="body">
                <Display />
            </div>
            <Footer />
        </>
    )
}

export default MainPage;
