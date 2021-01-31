import logo from './logo.svg';
import './App.css';

/**
 * Import all page components here
 */
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
