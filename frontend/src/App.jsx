import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Analyze from './pages/Analyze';
import Navbar from './components/Navbar';
import ThreatDetail from './pages/ThreatDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/threats/:id" element={<ThreatDetail />}/>
          <Route
            path="*"
            element={<h2 className="text-center mt-5">404 - Page Not Found</h2>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
