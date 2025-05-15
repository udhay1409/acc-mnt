
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import LandingPage from './pages/LandingPage';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<Index />} />
        <Route path="/login" element={<Index />} />
        <Route path="/dashboard/*" element={<Index />} />
        <Route path="/superadmin/*" element={<Index />} />
        <Route path="/unauthorized" element={<Index />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default App;
