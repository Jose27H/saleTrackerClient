import React from "react";

function SaleButton({ onNewSaleClick }) {
  const handleNewSaleClick = () => {
    onNewSaleClick();
  };

  const handleViewSales = async (event) => {
    try {
      // const response = await fetch("http://saletrackerserver-production.up.railway.app/api/viewSales");
      // const data = await response.json();
      window.location.href = "/SaleList";
      // console.log(data.saleItems);
      // Update state or perform any other operations with the sale items
    } catch (error) {
      console.error("Error fetching sale items:", error);
    }
  };

  const handleViewClosedSales = async (event) => {
    try {
      window.location.href = "/ClosedSaleList";
    } catch (error) {
      console.error("Error fetching sale items:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-7 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Select an Action
        </h1>

        <div className="my-6 space-x-4 flex flex-col md:flex-row">
          <button
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-2 md:mb-0 md:mr-2"
            onClick={handleNewSaleClick}
          >
            New Sale
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-2 md:mb-0 md:mr-2"
            onClick={handleViewClosedSales}
          >
            Already Contacted
          </button>
          <button
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleViewSales}
          >
            View Open Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaleButton;
