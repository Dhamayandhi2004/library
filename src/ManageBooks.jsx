import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ManageBooks.css';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [message, setMessage] = useState('');

  const apiUrl = 'http://localhost:5000/books';

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books:', error);
      });
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);

    // Clear message after 20 seconds
    setTimeout(() => {
      setMessage('');
    }, 20000);
  };

  const handleAddBook = () => {
    if (name && author && genre && imageUrl) {
      axios.post(apiUrl, { name, author, genre, imageUrl })
        .then(response => {
          setBooks([...books, response.data]);
          clearForm();
          showMessage('Book added successfully.');
        })
        .catch(error => {
          console.error('There was an error adding the book:', error);
        });
    } else {
      alert('Please fill all fields');
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setName(book.name);
    setAuthor(book.author);
    setGenre(book.genre);
    setImageUrl(book.imageUrl);
  };

  const handleUpdateBook = () => {
    if (editingBook) {
      axios.put(`${apiUrl}/${editingBook._id}`, { name, author, genre, imageUrl })
        .then(response => {
          const updatedBooks = books.map(book =>
            book._id === editingBook._id ? response.data : book
          );
          setBooks(updatedBooks);
          clearForm();
          showMessage('Book updated successfully.');
        })
        .catch(error => {
          console.error('There was an error updating the book:', error);
        });
    }
  };

  const handleDeleteBook = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        setBooks(books.filter(book => book._id !== id));
        showMessage('Book deleted successfully.');
      })
      .catch(error => {
        console.error('There was an error deleting the book:', error);
      });
  };

  const clearForm = () => {
    setName('');
    setAuthor('');
    setGenre('');
    setImageUrl('');
    setEditingBook(null);
    setMessage('');
  };

  return (
    <div className="home-container">
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

        <div className="manage-books">
          <h1>Manage Books</h1>
          {message && <p className="message">{message}</p>}
          <div className="form-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button onClick={editingBook ? handleUpdateBook : handleAddBook}>
              {editingBook ? 'Update Book' : 'Add Book'}
            </button>
            {editingBook && (
              <button onClick={clearForm}>Cancel</button>
            )}
          </div>

          <div className="books-list">
            <h2>Books List</h2>
            {books.length === 0 ? (
              <p>No books available. Add a book to get started!</p>
            ) : (
              <ul>
                {books.map((book) => (
                  <li key={book._id}>
                    <h3>{book.name}</h3>
                    <p>{book.author}</p>
                    <p>{book.genre}</p>
                    {book.imageUrl && (
                      <img
                        src={book.imageUrl}
                        alt={book.name}
                        width="100"
                        onError={(e) => e.target.src = 'placeholder.jpg'}
                      />
                    )}
                    <button onClick={() => handleEditBook(book)}>Edit</button>
                    <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
