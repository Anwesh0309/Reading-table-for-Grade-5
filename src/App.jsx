import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import IntroModal from './pages/IntroModal';
import Wonder from './pages/Wonder';
import Story from './pages/Story';
import Simulate from './pages/Simulate';
import Play from './pages/Play';
import Reflect from './pages/Reflect';

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<IntroModal />} />
          <Route path="/wonder" element={<Wonder />} />
          <Route path="/story" element={<Story />} />
          <Route path="/simulate" element={<Simulate />} />
          <Route path="/play" element={<Play />} />
          <Route path="/reflect" element={<Reflect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
