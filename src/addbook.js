import React, { useState } from 'react';
import "./style.css"
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate=useNavigate();

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState('');
  const [price, setPrice] = useState('');

  const email=localStorage.getItem('email');

    useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login'); 
    } else {
      
    }
  }, [navigate]);

  const handleAddBook = () => {
    const bookData = {
      name: name,
      author: author,
      description: description,
      in_stock: inStock,
      price: price,
      email: email
    };

    axios.post('http://localhost:8080/api/book/post', bookData)
      .then(response => {
        console.log('Book added:', response.data);
        // Reset form fields
        setName('');
        setAuthor('');
        setDescription('');
        setInStock('');
        setPrice('');
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  return (
    <div className="add-book-background">
      <div className="add-book-container">
        <div className="add-book-title">ADD NEW BOOK</div>
        <form>
          <label>
            Book Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Author:
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
          </label>
          <br />
          <label>
            Description:
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          </label>
          <br />
          <label>
            In Stock:
            <input type="number" value={inStock} onChange={e => setInStock(e.target.value)} />
          </label>
          <br />
          <label>
            Price:
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleAddBook} className="add-book-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
