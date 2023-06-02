import React, { useState } from 'react';
import './style.css';

const Invoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [items, setItems] = useState([{ bookName: '', quantity: '', price: '' }]);

  const handlePrint = () => {
    window.print();
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const lastItem = items[items.length - 1];
    if (lastItem.bookName !== '' && lastItem.quantity !== '' && lastItem.price !== '') {
      setItems([...items, { bookName: '', quantity: '', price: '' }]);
    }
  };

  return (
    <div>
      <div className="invoicebox">
        <div class="h7"> <p>BOOKLANDIA BILL</p></div>
        
        <form>
          <br/>

          {items.map((item, index) => (
          <div key={index}>

                <label> Book Name: <input className='inputbox' type="text" value={item.bookName} onChange={(e) => handleItemChange(index, 'bookName', e.target.value)}/> </label>

              <br/>

              <label> Quantity: <input className='inputbox' type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} /></label>

              <br/>

              <label> Price:<input className='inputbox' type="number" value={item.price}  onChange={(e) => handleItemChange(index, 'price', e.target.value)}/> </label>

              <br/>
            </div>
          ))}

          <button type="button" onClick={handleAddItem} disabled={items[items.length - 1].bookName === '' || items[items.length - 1].quantity === '' || items[items.length - 1].price === ''}>
            Add Item
          </button>

          <br/>

          <label> Customer Name: <input className='inputbox' type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/></label>

          <br/>

          <label> Mobile Number: <input className='inputbox' type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/></label>

          <br/>

          <button type="button" onClick={handlePrint}> Print </button>
            
        </form>
      </div>
    </div>
  );
};

export default Invoice;