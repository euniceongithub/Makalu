import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.jpg';
import { signInWithGoogle, logOut } from './firebase';
import SellPage from './SellPage';

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Add functionality to search items based on the searchTerm
  };

  const handleLogin = () => {
    signInWithGoogle()
      .then(userCredential => {
        setUser(userCredential.user);
        setDialogOpen(false);
      })
      .catch(error => {
        console.error('Login failed:', error);
        // Optionally show some feedback to the user
      });
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        setUser(null);
        setDialogOpen(true);
      })
      .catch(error => {
        console.error('Logout failed:', error);
        // Optionally show some feedback to the user
      });
  };

  const toggleDialog = () => {
    setDialogOpen(prev => !prev);
  };

  const handleSwitchAccount = () => {
    handleLogin();
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/buy');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const items = await response.json();
        setItems(items);
      } catch (error) {
        console.error('Error fetching items:', error);
        // Optionally show some feedback to the user
      }
    };
    fetchItems();
  }, []);

  return (
    <div className={`App ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <header className="App-header">
        <div className="header-content">
          <button className="sidebar-btn" onClick={toggleSidebar}>☰</button>
          <img src={logo} alt="Logo" className="logo" />
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
        <div className="items-list">
          <h1>Available Items</h1>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <img src={item.image_url} alt={item.title} />
              </li>
            ))}
          </ul>
        </div>

        {/* Button to open login dialog */}
        <div className="login-container">
          <button className="login-btn" onClick={toggleDialog}>
            {user ? 'Log Out' : 'Login / Sign Up'}
          </button>
        </div>
      </main>

      {/* Dialog box for login/signup */}
      {dialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            {user ? (
              <>
                <p>Logged in as: {user.email}</p>
                <button className="dialog-btn" onClick={handleSwitchAccount}>
                  Switch Account
                </button>
                <button className="dialog-btn" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button className="dialog-btn" onClick={handleLogin}>
                  Log In
                </button>
                <button className="dialog-btn" onClick={handleLogin}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="App-footer">
      <p>© 2024 Makalu, All Rights Reserved</p>
    </footer>
  );
}

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
