import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import QRCode from 'qrcode.react';
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate=useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bookId, setBookId] = useState('');
  const [bookName, setBookName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [bookData, setBookData] = useState(null);
  const qrCodeRef = useRef(null);

    useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login'); 
    } else {
      
    }
  }, [navigate]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    if (qrCodeRef.current) {
      const qrData = JSON.stringify({
        customerName,
        mobileNumber,
        total: getTotalPrice(),
        bookName,
        quantity,
        price
      });
      qrCodeRef.current.makeCode(qrData);
    }
  }, [customerName, mobileNumber, bookName, quantity, price]);

  const handlePrint = () => {
    window.print();
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    const parsedQuantity = parseFloat(quantity);
    const parsedPrice = parseFloat(price);
    if (!isNaN(parsedQuantity) && !isNaN(parsedPrice)) {
      totalPrice = parsedQuantity * parsedPrice;
    }
    return totalPrice.toFixed(2);
  };

  const handleSave = () => {
    const invoiceData = {
      customerName,
      mobileNumber,
      bookId,
      bookName,
      quantity,
      price,
      total: getTotalPrice()
    };

    // Replace this with your save logic
    console.log('Invoice Data:', invoiceData);
  };

  const fetchBookData = () => {
    // Replace this with your fetch logic using the bookId state
    // For example, you can make an API call to retrieve the book details
    const fetchedBookData = {
      title: 'Book Title',
      author: 'Book Author',
      description: 'Book Description'
    };

    setBookData(fetchedBookData);
  };

  const handleFetchBookData = () => {
    if (bookId) {
      fetchBookData();
    }
  };

  return (
    <div>
      <div className="invoicebox">
        <div className="">
          <p>PURCHASE INVOICE</p>
          <div className="date">{currentDate}</div>
          <div className="customer-info">
            <div className="customer-field">
              <label>Customer Name:</label>
              <input
                className="inputbox"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="customer-field">
              <label>Mobile Number:</label>
              <input
                className="inputbox"
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <form>
          <br />

          <div className="item">
            <div className="item-field">
              <label>Book ID:</label>
              <input
                className="inputbox"
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
              <button type="button" onClick={handleFetchBookData}>
                Fetch Book Data
              </button>
            </div>

            <div className="item-field">
              <label>Book Name:</label>
              <input
                className="inputbox"
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </div>
            <div className="item-field">
              <label>Quantity:</label>
              <input
                className="inputbox"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="item-field">
              <label>Price:</label>
              <input
                className="inputbox"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <br />

          <div className="total">₹{getTotalPrice()}</div>

          <br />

          <button type="button" onClick={handlePrint}>
            Get Bill
          </button>

          <button type="button" onClick={handleSave}>
            Save
          </button>

          <div className="thankyou">THANK YOU! VISIT AGAIN!</div>
          <div className="qrcode">
            <QRCode value={JSON.stringify({ customerName, mobileNumber, bookName, quantity, price })} ref={qrCodeRef} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invoice;