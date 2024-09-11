import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.jpg'; // Adjust the path if needed

// Components for home and sell pages
function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className={`App ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <header className="App-header">
        <div className="header-content">
          <button className="sidebar-btn" onClick={toggleSidebar}>☰</button>
          <img src={logo} alt="Logo" className='logo' />
          <Link to="/sell">
            <button className="sell-btn">SELL</button>
          </Link>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <p>Sidebar Option 1</p>
        <p>Sidebar Option 2</p>
        <p>Sidebar Option 3</p>
      </aside>

      <main className="main-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search search-icon" onClick={handleSearch}></i>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="App-footer">
      <p>© 2024 Makalu, All Rights Reserved</p>
    </footer>
  );
}

// Placeholder for the SellPage
function SellPage() {
  return (
    <div>
      <h1>Sell your item here</h1>
      <p>This is where the selling form will be.</p>
    </div>
  );
}

// Main App component with routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sell" element={<SellPage />} />
      </Routes>
    </Router>
  );
}

export default App;