import React, { useState } from 'react';
import './style.css';

const AddBook = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState('');
  const [price, setPrice] = useState('');

  const handleAddBook = () => {
    setName('');
    setAuthor('');
    setDescription('');
    setInStock('');
    setPrice('');
  };

  return (
    <div className="add-book-container">
      <div className="add-book-title">Add a Book </div>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          In Stock:
          <input type="number" value={inStock} onChange={(e) => setInStock(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleAddBook} className="add-book-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;