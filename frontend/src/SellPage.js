import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './logo.jpg';

function SellPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    picture: null,
    keywords: '',
    location: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      picture: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.itemName);
    data.append('description', formData.description);
    data.append('image', formData.picture);
    data.append('keywords', formData.keywords);
    data.append('location', formData.location);
    data.append('price', formData.price);

    try {
      const response = await fetch('http://localhost:5000/api/sell', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Item posted successfully!');
      } else {
        alert('Error posting item');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error posting item');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <button className="sidebar-btn">☰</button>
          <img src={logo} alt="Logo" className="logo" />
          <Link to="/">
            <button className="sell-btn">BUY</button>
          </Link>
        </div>
      </header>

      <main className="main-container">
        <div className="sell-content">
          <h1>Sell your item here</h1>
          <button onClick={() => setShowForm(!showForm)} className="add-item-btn">
            {showForm ? 'Hide Form' : 'Add New Item'}
          </button>

          {showForm && (
            <form className="sell-form" onSubmit={handleFormSubmit}>
              <label>
                Name of Item:
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter item description"
                  required
                />
              </label>
              <label>
                Picture:
                <input
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </label>
              <label>
                Keywords:
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="Enter keywords"
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </label>
              <button type="submit" className="sell-submit-btn">Submit</button>
            </form>
          )}
        </div>
      </main>

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

export default SellPage;