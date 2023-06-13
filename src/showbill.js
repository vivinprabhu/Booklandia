import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Showbill = () => {
  const [billData, setBillData] = useState([]);
  const [sortByDate, setSortByDate] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBillData();
  }, []); // Empty dependency array to run the effect only once

  const fetchBillData = async () => {
    try {
      const email = localStorage.getItem('email');
      const response = await axios.get(`http://localhost:8080/api/bill/getByEmail/${email}`);
      if (response.status === 200) {
        setBillData(response.data);
      }
    } catch (error) {
      console.error('Error fetching bill data:', error);
    }
  };
  

  const handleSortByDateChange = (event) => {
    setSortByDate(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterBillData = () => {
    return billData.filter((bill) =>
      bill.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortBillRecords = () => {
    const sortedBills = [...filterBillData()].sort((a, b) => {
      if (sortByDate === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

    setBillData(sortedBills);
  };

  useEffect(() => {
    sortBillRecords();
  }, [sortByDate]); // Run the effect whenever sortByDate changes

  return (
    <div className="table-container">
      <br></br>
      <div className="sort-dropdown">
        <label htmlFor="date">Sort By Date:</label>
        <select id="date" value={sortByDate} onChange={handleSortByDateChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="search-box">
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Enter customer name..."
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Book Name</th>
            <th>Quantity</th>
            <th>Customer Name</th>
            <th>Mobile Number</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {filterBillData().map((bill) => (
            <tr key={bill.bill_id}>
              <td>{bill.bill_id}</td>
              <td>{bill.book_name}</td>
              <td>{bill.quantity}</td>
              <td>{bill.customer_name}</td>
              <td>{bill.mobile_number}</td>
              <td>{bill.price}</td>
              <td>{bill.discount}</td>
              <td>{bill.payment_method}</td>
              <td>{bill.date}</td>
              <td>{bill.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Showbill;
