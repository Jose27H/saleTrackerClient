import React, { useState, useEffect } from "react";

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10; // Number of items per page

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/viewSales`);
        const data = await response.json();
        setSales(data.saleItems);
        console.log(sales);
        setTotalPages(Math.ceil(data.saleItems.length / pageSize));
      } catch (error) {
        console.log("error");
      }
    };
    fetchSales();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sales.length);

  const handleButtonClick = (item) => {
    sessionStorage.setItem("saleID", item.saleid);
    sessionStorage.setItem("customerPhoneNumber", item.phonenumber);
    window.location.href = "/ExistingSale";
  };

  return (
    <div className="bg-white-200">
      <h1 className="text-4xl font-bold text-center bg-gray-500 py-4">
        Open Sales
      </h1>
      {sales.slice(startIndex, endIndex).map((item, index) => (
        <div
          key={item.saleid}
          className={`py-4 text-center ${
            index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
          } rounded-lg`}
        >
          <p>
            <strong>Customer Name:</strong> {item.customername}
          </p>
          <p>
            <strong>Phone Number:</strong> {item.phonenumber}
          </p>
          <p>
            <strong>Sale ID:</strong> {item.saleid}
          </p>
          <p>
            <strong>Total Items:</strong> {item.totalitems}
          </p>
          {/* Add a styled button for each result */}
          <button
            onClick={() => handleButtonClick(item)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
          >
            View Sale
          </button>
        </div>
      ))}
      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SaleList;
