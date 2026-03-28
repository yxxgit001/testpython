import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Practice from './pages/Practice';
import Profile from './pages/Profile';
import Learn from './pages/Learn';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn/:lessonId" element={<Learn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;