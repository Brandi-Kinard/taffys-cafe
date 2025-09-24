import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';

function App() {
  return (
    <Router basename="/taffys-cafe">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App
