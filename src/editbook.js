import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

const Editbook = () => {
  const navigate=useNavigate();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const email=localStorage.getItem('email');

    useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login'); 
    } else {
      
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch data from the backend and update the books state
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/book/getByEmail/${email}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log('Fetched books:', data);
      setBooks(data);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowDetails = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const handleEdit = () => {
    if (selectedBook) {
      // Make a PUT request to update the selectedBook in the backend
      fetch(`http://localhost:8080/api/book/put/${selectedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedBook),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Updated book:', data);
          // Update the books state with the updated book data
          const updatedBooks = books.map((book) =>
            book.id === selectedBook.id ? data : book
          );
          setBooks(updatedBooks);
          setShowPopup(false);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = () => {
    if (selectedBook) {
      // Make a DELETE request to delete the selectedBook from the backend
      fetch(`http://localhost:8080/api/book/delete/${selectedBook.id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('Deleted book:', selectedBook);
            // Remove the deleted book from the books state
            const updatedBooks = books.filter(
              (book) => book.id !== selectedBook.id
            );
            setBooks(updatedBooks);
            setShowPopup(false); // Close the popup after successful delete
          } else {
            console.log('Failed to delete book:', selectedBook);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const id = books.id;
  sessionStorage.setItem("id", id);
  localStorage.setItem("id", id);
  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="book-table">
        <thead>
          <tr>
            <th>BOOK ID</th>
            <th>BOOK NAME</th>
            <th>AUTHOR</th>
            <th>DESCRIPTION</th>
            <th>IN STOCK</th>
            <th>PRICE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>{book.in_stock}</td>
              <td>{book.price}</td>
              <td>
                <div
                  className="details-button"
                  onClick={() => handleShowDetails(book)}>
                  Options
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>UPDATE & DELETE</p>
            <input
              type="text"
              value={selectedBook.name}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, name: e.target.value })
              }
              className="edit-input"
            />
            <br />
            <input
              type="text"
              value={selectedBook.author}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, author: e.target.value })
              }
              className="edit-input"
            />
            <br />
            <input
              type="text"
              value={selectedBook.description}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, description: e.target.value })
              }
              className="edit-input"
            />
            <br />
            <input
              type="text"
              value={selectedBook.in_stock}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, in_stock: e.target.value })
              }
              className="edit-input"
            />
            <br />
            <input
              type="text"
              value={selectedBook.price}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, price: e.target.value })
              }
              className="edit-input"
            />
            <br />
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editbook;
