import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddToCartPage = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]); // List of favorite books
  const userEmail = localStorage.getItem('userEmail'); // Assuming user is logged in

  // Fetch favorite books (replace with an actual API fetch if necessary)
  useEffect(() => {
    if (userEmail) {
      const fetchedFavorites = [
        {
          _id: '1',
          name: 'Book 1',
          author: 'Author 1',
          genre: 'Genre 1',
          year: 2022,
          description: 'Description of Book 1',
          imageUrl: 'https://via.placeholder.com/150',
        },
        {
          _id: '2',
          name: 'Book 2',
          author: 'Author 2',
          genre: 'Genre 2',
          year: 2021,
          description: 'Description of Book 2',
          imageUrl: 'https://via.placeholder.com/150',
        },
      ];
      setFavorites(fetchedFavorites);
    }
  }, [userEmail]);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Handle adding books to the cart
  const handleAddToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save cart to localStorage
  };

  return (
    <div className="add-to-cart-container">
      <h2>Your Favorite Books</h2>
      <div className="books-grid">
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          favorites.map((book) => (
            <div key={book._id} className="book-item">
              <h3>{book.name}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Year:</strong> {book.year}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <img src={book.imageUrl} alt={book.name} className="book-image" />
              {/* Add to Cart button */}
              <button onClick={() => handleAddToCart(book)} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Show cart items */}
      <div className="cart-section">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty. Add books to your cart.</p>
        ) : (
          <ul>
            {cart.map((book) => (
              <li key={book._id}>
                <strong>{book.name}</strong> by {book.author}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to="/borrow" className="borrow-link">
        Go to Borrow Page
      </Link>
    </div>
  );
};

export default AddToCartPage;
