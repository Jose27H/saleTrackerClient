import React, { useState } from "react";
import SaleButton from "../../components/sales/SaleButton";
import Tracker from "../5.tracker/tracker";

function SaleHome() {
  const [showTracker, setShowTracker] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = () => {
    setSelectedButton("New Sale");
    setShowTracker(true);
  };

  return (
    <div className="bg-gray-500">
      {showTracker ? (
        <Tracker selectedButton={selectedButton} />
      ) : (
        <SaleButton onNewSaleClick={handleButtonClick} />
      )}
    </div>
  );
}

export default SaleHome;
