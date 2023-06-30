import React, { useState } from "react";
import PatientForm from "../../components/patientform/patientForm.jsx";
import PhoneCheckForm from "../../components/patientform/PhoneCheckForm.jsx";

const Tracker = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleToggleForm = () => {
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">New Sale</h1>
      <div className="mb-4">
        <PhoneCheckForm />
      </div>

      <button
        onClick={handleToggleForm}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 mb-4"
      >
        {isFormVisible ? "Close Form" : "New Customer"}
      </button>

      {isFormVisible && (
        <>
          <PatientForm />
        </>
      )}
    </div>
  );
};

export default Tracker;
