import React from "react";

function SaleButton({ onNewSaleClick }) {
  const handleNewSaleClick = () => {
    onNewSaleClick();
  };

  const handleViewSales = (event) => {
    window.location.href = "/Saleslist";
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
            View Sales
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
