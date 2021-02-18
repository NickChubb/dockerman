import './App.css';

/**
 * Import all page components here
 */
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
