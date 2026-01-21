// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import FeaturesPage from './pages/FeaturesPage';
import Contact from './pages/Contact';
import Benefits from './pages/Benefits';
import DemoRequest from './pages/DemoRequest';
import UnderDevelopment from './pages/UnderDevelopment';

function App() {
  return (
    <Router>
      <ScrollToTop />   {/* 👈 Ini yang bikin auto scroll ke atas */}

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo-request" element={<DemoRequest />} />
            <Route path="/under-development" element={<UnderDevelopment />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
