import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaCartPlus } from 'react-icons/fa';
import './SearchBooks.css';

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const userEmail = localStorage.getItem('userEmail'); // Get logged-in user's email from localStorage
  const [loading, setLoading] = useState(false); // State for loading spinner

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
        alert('Failed to load books. Please try again later.');
      });
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      (book.name && book.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const handleAddFavorite = (bookId) => {
    if (!userEmail) {
      alert("Please log in to add books to favorites.");
      return;
    }
  
    axios
      .post('http://localhost:5000/favorites', { email: userEmail, bookId })
      .then((response) => {
        alert(response.data.message || 'Book added to favorites!');
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
        if (error.response) {
          // Log the full error response to see more details
          console.log('Error response:', error.response);
          alert(error.response.data.message || 'Failed to add to favorites.');
        } else if (error.request) {
          // Log the request that was made
          console.log('Error request:', error.request);
          alert('No response from server. Please check your connection.');
        } else {
          // Log any other errors
          console.log('Error message:', error.message);
          alert('Error: ' + error.message);
        }
      });
  };
  
  // Handle add to cart (for future order placing functionality)
  const handleAddToCart = (bookId) => {
    alert('Added to cart (Future functionality)');
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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="book-list">
            {filteredBooks.length === 0 ? (
              <p>No books found.</p>
            ) : (
              filteredBooks.map((book) => (
                <div key={book._id} className="book-card">
                  {book.imageUrl && (
                    <img src={book.imageUrl} alt={book.name} className="book-image" />
                  )}
                  <h3>{book.name}</h3>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Year:</strong> {book.year}
                  </p>
                  <p>
                    <strong>Description:</strong> {book.description}
                  </p>

                  {/* Add to Favorites Button */}
                  <button
                    onClick={() => handleAddFavorite(book._id)}
                    className="fav-button"
                  >
                    <FaHeart /> Add to Favorites
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(book._id)}
                    className="cart-button"
                  >
                    <FaCartPlus /> Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
