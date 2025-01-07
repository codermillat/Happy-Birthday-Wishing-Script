import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Setup from './pages/Setup';
import CustomizeWish from './pages/CustomizeWish';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/customize/:occasion" element={<CustomizeWish />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;