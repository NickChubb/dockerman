import './App.css';
import './popup.css';

/**
 * Import all page components here
 */
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';
import Popup from 'react-popup';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Popup />
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
