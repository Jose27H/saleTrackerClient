import React, { useState, useEffect } from "react";

const CustomerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setcustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10; // Number of rows per page

  useEffect(() => {
    const fetchcustomers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/customers?search=${searchTerm}&page=${currentPage}`
        );
        const data = await response.json();

        setcustomers(data.customers);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchcustomers();
  }, [searchTerm, currentPage]);

  const handleSearch = async () => {
    setCurrentPage(1);
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers?search=${searchTerm}&page=${currentPage}`
      );
      const data = await response.json();

      setcustomers(data.customers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const redirectMe = (number) => {
    sessionStorage.setItem("customerPhoneNumber", number);

    fetch("http://localhost:3000/api/startSale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: number }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/services";
        } else {
          console.error("Failed to start sale:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error starting sale:", error);
      });
  };

  const viewCXSales = (number) => {
    sessionStorage.setItem("customerPhoneNumber", number);
    window.location.href = "CxSales";
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md mr-2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>

      <div className="table-container ">
        {customers.map((patient) => (
          <div
            key={patient.id}
            className="bg-gray-400 rounded-lg px-8 py-8 text-center "
          >
            <div className="patient-info">
              <div className="info-label">Name:</div>
              <div className="info-value">{patient.name}</div>
            </div>
            <div className="patient-info">
              <div className="info-label">Email:</div>
              <div className="info-value">{patient.email}</div>
            </div>
            <div className="patient-info">
              <div className="info-label">Phone Number:</div>
              <div className="info-value">{patient.phonenumber}</div>
            </div>
            <div className="patient-action">
              <button
                onClick={() => viewCXSales(patient.phonenumber)}
                className="px-4 py-4 m-2 bg-green-500 text-white rounded-md"
              >
                View All Sales
              </button>
              <button
                onClick={() => redirectMe(patient.phonenumber)}
                className="px-2 m-2 py-2 bg-blue-500 text-white rounded-md"
              >
                Create New Sale
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
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
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      <style jsx>{`
        .table-container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          gap: 1rem;
        }

        .patient-row {
          display: flex;

          flex-wrap: wrap;

          gap: 1rem;
          background-color: teal;
          padding: 1rem;
          border-radius: 0.5rem;
          width: 50%;
        }

        .patient-info {
          display: flex;
          flex-basis: 50%;
          align-items: center;
        }

        .info-label {
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .patient-action {
          flex-basis: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5rem;
        }

        @media (max-width: 600px) {
          .patient-info {
            flex-basis: 100%;
          }
        }
      `}</style>
    </div>
  );
};
``;

export default CustomerTable;
