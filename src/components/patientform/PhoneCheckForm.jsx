import React, { useState } from "react";

const Form = () => {
  const [number, setNumber] = useState("");
  const [buttonColor, setButtonColor] = useState("red");

  const handleNumberChange = (event) => {
    const inputValue = event.target.value;
    setNumber(inputValue);

    // Perform the POST/fetch API call
    fetch("https://localhost:3000/api/formnumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: inputValue }),
    })
      .then((response) => response.json())
      .then(({ info, pnumber }) => {
        // Handle the response data if needed

        // Change the button color based on the input value
        if (info === "yes") {
          setButtonColor("blue");
        } else {
          setButtonColor("red");
        }
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const redirectMe = (event) => {
    sessionStorage.setItem("customerPhoneNumber", number);

    fetch("https://localhost:3000/api/startSale", {
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

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex items-center">
        <label htmlFor="number" className="mr-4 font-bold">
          Existing Customer:
        </label>
        <input
          type="number"
          id="number"
          name="number"
          value={number}
          onChange={handleNumberChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300 ml-2`}
          onClick={redirectMe}
          disabled={buttonColor !== "blue"}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
