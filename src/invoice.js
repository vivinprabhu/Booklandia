import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bookId, setBookId] = useState('');
  const [bookName, setBookName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [paymentOption, setPaymentOption] = useState('Cash');
  const [currentDate, setCurrentDate] = useState('');
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [bookNotFoundError, setBookNotFoundError] = useState('');

  const email = localStorage.getItem('email');


  const qrCodeRef = useRef(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login');
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
        total: totalPrice,
        bookName,
        quantity,
        price,
        discount,
        paymentOption,
      });
      qrCodeRef.current.makeCode(qrData);
    }
  }, [customerName, mobileNumber, bookName, quantity, price, discount, paymentOption, totalPrice]);

  const handlePrint = () => {
    window.print();
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const parsedQuantity = parseFloat(quantity);
    const parsedPrice = parseFloat(price);
    const parsedDiscount = parseFloat(discount);
  
    if (!isNaN(parsedQuantity) && !isNaN(parsedPrice)) {
      totalPrice = parsedQuantity * parsedPrice;
  
      if (!isNaN(parsedDiscount)) {
        if (parsedDiscount >= 100) {
          totalPrice = 0;
        } else {
          totalPrice -= (totalPrice * parsedDiscount) / 100;
        }
      }
    }
  
    return totalPrice.toFixed(2);
  };
  

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, [quantity, price, discount]);

  const handleSave = async () => {
    const invoiceData = {
      book_name: bookName,
      customer_name: customerName,
      quantity: quantity,
      mobile_number: mobileNumber,
      price:price,
      discount:discount,
      payment_method: paymentOption,
      total_price: totalPrice,
      email:email,
    };

    console.log('Invoice Data:', invoiceData);

    try {
      const response = await axios.post('http://localhost:8080/api/bill/post', invoiceData);
      console.log('Bill saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  const handleFetchBookData = async (bookId, email) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/book/get/${bookId}`, {
        headers: {
          'X-User-Email': email,
        },
      });
      const fetchedBookData = response.data;
  
      const localStorageEmail = localStorage.getItem('email');
      if (fetchedBookData.email === localStorageEmail) {
        setBookData(fetchedBookData);
        setBookName(fetchedBookData.name);
        setPrice(fetchedBookData.price);
        setBookNotFoundError(''); 
      } else {
        setBookData(null);
        setBookName('');
        setPrice('');
        setBookNotFoundError('Book does not exist.'); 
      }
  
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching book data:', error);
      setBookData(null);
      setBookName('');
      setPrice('');
      setBookNotFoundError('Please enter a correct book ID'); 
    }
  };
  

  useEffect(() => {
    if (bookData) {
      console.log(bookData.name);
    }
  }, [bookData]);

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

              <button
                type="button"
                onClick={() => handleFetchBookData(bookId, localStorage.getItem('email'))}
              >
                Get Book
              </button>
            </div>

            {error && <div className="error">{error}</div>} {/* Display the error message */}
            {bookNotFoundError && <div className="error">{bookNotFoundError}</div>} {/* Display the book not found error message */}


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
            <div className="item-field">
              <label>Discount:</label>
              <input 
                placeholder='%'
                className="inputbox"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <br></br>
            <div className="item-field">
              <label>Payment Option: </label>
              <select
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </div>

          <br />

          <div className="total">₹{totalPrice}</div>

          <br />

          <button type="button" onClick={handlePrint}>
            Get Bill
          </button>

          <button type="button" onClick={handleSave}>
            Save
          </button>

          <div className="thankyou">THANK YOU! VISIT AGAIN!</div>
          <div className="qrcode">
            <QRCode
              value={JSON.stringify({ customerName, mobileNumber, bookName, quantity, price, discount, paymentOption })}
              ref={qrCodeRef}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Invoice;