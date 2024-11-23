import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:5000/favorites?email=${userEmail}`)
        .then(response => {
          setFavorites(response.data); // Display favorite books
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    }
  }, [userEmail]);

  const handleBuy = (bookId) => {
    // Handle the logic for buying the book (e.g., redirect to a purchase page)
    alert(`Book with ID: ${bookId} is ready for purchase!`);
    // You can redirect the user to a checkout or payment page here.
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <div className="website-name">Heaven Edu</div>
        <nav className="nav-links">
          <Link to="/UserDashBoard">Home</Link>
          <Link to="/searchbooks">Search Books</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
      <div className="favorites-page-container">
        <h2>Your Favorites</h2>
        <div className="books-grid">
          {favorites.length === 0 ? (
            <p>No favorites added yet.</p>
          ) : (
            favorites.map(book => (
              <div key={book._id} className="book-item">
                <h3>{book.name}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Year:</strong> {book.year}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <img src={book.imageUrl} alt={book.name} className="book-image" />
                <button onClick={() => handleBuy(book._id)} className="buy-button">
                  Buy
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
