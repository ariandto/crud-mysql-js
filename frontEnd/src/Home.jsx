import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderKeyParsing from './OrderKeyParsing';
import './style.css'

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const rowsPerPage = 3;

  useEffect(() => {
    axios
      .get('http://localhost:8081/')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Filter the data based on the search term
  const filteredData = data.filter((route) => {
    return (
      route.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.shiptoname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.remarks.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  return (
    
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 p-3">
        <div className="d-flex justify-content-end mb-3">
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Address, Area, Customer, Remarks"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
          <thead class=" thead thead-dark">
              <tr>
                <th>Ship To Name</th>
                <th>Address</th>
                <th>Remarks</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((route, index) => {
                return (
                  <tr key={index}>
                    <td>{route.shiptoname}</td>
                    <td>{route.address}</td>
                    <td>{route.remarks}</td>
                    <td>{route.area}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <OrderKeyParsing />
        </div>
        <div className="pagination d-flex justify-content-center">
          {filteredData.length > rowsPerPage && (
            <ul className="pagination">
              {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
