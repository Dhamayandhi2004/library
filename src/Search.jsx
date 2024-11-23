import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Ensure you import Link if using it
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const apiUrl = 'http://localhost:5000/books'; // Correct URL

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        console.log("Fetched books data:", response.data); // Inspect data structure
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  // Filter books based on search term, checking for undefined values
  const filteredBooks = books.filter(book =>
    (book.name && book.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="home-container">
      <div className="navbar">
        <div className="website-name">Heaven Edu</div>
        <nav className="nav-links">
          <Link to="/AdminDashboard">Home</Link>
          <Link to="/managebooks">Manage Books</Link>
          <Link to="/search">Search</Link>
          <Link to="/vieworders">View Orders</Link>
        </nav>
      </div>
      
      <div>
        <input
          type="text"
          placeholder="Search by name or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        
        <div className="book-list">
          {filteredBooks.length === 0 ? (
            <p>No books found.</p>
          ) : (
            filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                {book.imageUrl && (
                  <img src={book.imageUrl} alt={book.title} className="book-image" />
                )}
                <h3>{book.title}</h3>
                <p><strong>Name:</strong> {book.name}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Published Year:</strong> {book.year}</p>
                <p><strong>Description:</strong> {book.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
