import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import PaginaR from './PaginaR';
import Contatti from './Contatti';
import './App.css';
import Chat from './Chat';
import Sponsor from './Sponsor';

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.5 } }
};

// Effetto fade-in per navbar
const fadeIn = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>        
        <Route path="/" element={<motion.div {...pageVariants}><PaginaR /></motion.div>} />
        <Route path="/contatti" element={<motion.div {...pageVariants}><Contatti /></motion.div>} />
        <Route path="/Chat" element={<motion.div {...pageVariants}><Chat /></motion.div>} />
        <Route path="/Sponsor" element={<motion.div {...pageVariants}><Sponsor /></motion.div>} />
        <Route path="*" element={<motion.div {...pageVariants}><div>404 - Pagina non trovata</div></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit">
      <Router>
        <div className="container">
          
          {/* Barra di navigazione con il logo accanto al titolo */}
          <motion.header className="header" variants={fadeIn}>
            <nav className="navbar">
              <div className="nav-links">
                <Link to="/">Home</Link>
                <span className="separator">|</span>
                <Link to="/contatti">Contatti</Link>
                <span className="separator">|</span>
                <Link to="/Chat">Chat</Link>
                <span className="separator">|</span>
                <Link to="/Sponsor">Sponsor</Link>
              </div>
              <div className="logo-container">
                <h1 className="logo-text">Radio PoPizz <br/> <h6> Clicca sul logo per ascoltare la tua radio.</h6></h1>
                
                {/* Logo con animazione accanto al titolo */}
                <motion.button 
                  id="playButton"
                  onClick={togglePlay}
                  animate={{ rotate: isPlaying ? 360 : 0 }} 
                  transition={{ duration: 1, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                >
                  <img id="logo" src="https://www.radiopopizz.it/asset/popizzLogo.png" alt="Logo di Radio PoPizz"/>
                  <audio ref={audioRef} src="https://nr11.newradio.it/proxy/belviso2?mp=/stream" type="audio/mp3"/>
                </motion.button>
              </div>
            </nav>
          </motion.header>

          {/* Sezione contenuto con animazione */}
          <div className="content">
            <AnimatedRoutes />
          </div>

        </div>
      </Router>
    </motion.div>
  );
}

export default App;
