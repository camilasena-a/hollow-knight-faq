import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GameSelection from './pages/GameSelection';
// Hollow Knight 1 Pages
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import Contact from './pages/Contact';
// Silksong Pages
import HomeHK2 from './pages/hk2/Home';
import TutorialsHK2 from './pages/hk2/Tutorials';
import TutorialDetailHK2 from './pages/hk2/TutorialDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Game Selection Page - No Layout */}
        <Route path="/" element={<GameSelection />} />
        
        {/* Hollow Knight 1 Routes - With Layout */}
        <Route path="/hk1/*" element={
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="tutoriais" element={<Tutorials />} />
              <Route path="tutorial/:id" element={<TutorialDetail />} />
              <Route path="contato" element={<Contact />} />
            </Routes>
          </Layout>
        } />
        
        {/* Hollow Knight 2 Routes - With Layout */}
        <Route path="/hk2/*" element={
          <Layout>
            <Routes>
              <Route index element={<HomeHK2 />} />
              <Route path="tutoriais" element={<TutorialsHK2 />} />
              <Route path="tutorial/:id" element={<TutorialDetailHK2 />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
