import React, { useState, useEffect } from "react";

const Golf = () => {
  useEffect(() => {
    // Check if there is a value in sessionStorage
    const golferNumber = sessionStorage.getItem("golferNumber");
    if (golferNumber) {
      // Redirect to /Golf/Gprofile
      window.location.href = "/Golf/Gprofile";
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-500">
      <h1 className="text-4xl text-white font-bold mb-8">
        Login To Enter Scores
      </h1>
      <GLogin />
    </div>
  );
};

export default Golf;
