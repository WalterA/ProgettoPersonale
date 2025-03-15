import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Per l'animazione
import PaginaR from './PaginaR';
import Contatti from './Contatti';
import './App.css';

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.5 } }
};

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          {/* Barra di navigazione */}
          <div className="header">
              <nav className="navbar">
                  <div className="nav-links">
                        <Link to="/">Home</Link>
                        <span className="separator">|</span>
                        <Link to="/contatti">Contatti</Link>
                    </div>
                    <h1 className="logo">Radio PoPizz</h1>  
                </nav>
          </div>

          {/* Bottone per la riproduzione audio con logo */}
          <button id="playButton" className="btn btn-outline-primary" aria-label="Riproduci/Pausa">
            <img id="logo" src="https://www.radiopopizz.it/asset/popizzLogo.png" alt="Logo di Radio PoPizz"/>
            <audio id="audioPlayer" src="https://nr11.newradio.it/proxy/belviso2?mp=/stream" type="audio/mp3"/>
          </button>

          {/* Sezione contenuto con animazione */}
          <div className="content">
            <Routes>
              <Route path="/" element={<motion.div {...pageVariants}><PaginaR /></motion.div>} />
              <Route path="/contatti" element={<motion.div {...pageVariants}><Contatti /></motion.div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
