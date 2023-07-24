import React from "react";

function SaleButton({ onNewSaleClick }) {
  const handleNewSaleClick = () => {
    onNewSaleClick();
  };

  const handleViewSales = async (event) => {
    try {
      // const response = await fetch("http://localhost:3000/api/viewSales");
      // const data = await response.json();
      window.location.href = "/SaleList";
      // console.log(data.saleItems);
      // Update state or perform any other operations with the sale items
    } catch (error) {
      console.error("Error fetching sale items:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Select an Action
        </h1>

        <div className="my-6 space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleViewSales}
          >
            View Open Sales
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleNewSaleClick}
          >
            New Sale
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaleButton;
