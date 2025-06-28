import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from '../pages/chat';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={<ChatPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
