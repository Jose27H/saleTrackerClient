import React, { useState, useEffect } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again.</p>;
    }

    return this.props.children;
  }
}

const Services = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    observations: "",
  });
  const [productName, setProductName] = useState("");
  const [daysUntilRefill, setDaysUntilRefill] = useState("");
  const [saleItems, setSaleItems] = useState([]);

  const patientNumber = sessionStorage.getItem("patientNumber");

  const fetchPatientData = () => {
    // Get the patient number from session storage

    // Make an API request to fetch patient data based on the patient number
    fetch(
      `https://callertrackerserver.up.railway.app/api/patientData?name=${patientNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Set the fetched patient data in state
        setPatientData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSaleItems = () => {
    // Make an API request to fetch the sale items for the patient
    fetch(
      `https://callertrackerserver.up.railway.app/api/patientData?name=${patientNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Set the fetched sale items in state
        setSaleItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch patient data and sale items from the backend on load
    fetchPatientData();
    fetchSaleItems();
  }, []);

  const handleObservationsChange = (event) => {
    const { value } = event.target;
    setPatientData((prevPatientData) => ({
      ...prevPatientData,
      message: value,
    }));
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDaysUntilRefillChange = (event) => {
    setDaysUntilRefill(event.target.value);
  };

  const handleAddToSale = () => {
    // Make an API request to add the item to the sale in the database
    fetch(
      `https://callertrackerserver.up.railway.app/api/patientData?name=${patientNumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: patientNumber,
          productName: productName,
          daysUntilRefill: daysUntilRefill,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Fetch the updated sale items after adding the item
        fetchSaleItems();
        // Clear the input fields
        setProductName("");
        setDaysUntilRefill("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ErrorBoundary>
      <div className="flex justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{patientData.name}</h2>
          <label
            htmlFor="phoneNumber"
            className="text-gray-700 font-semibold mb-1"
          >
            Phone Number:
          </label>
          <p className="mb-2">{patientData.phonenumber}</p>

          <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
            Email:
          </label>
          <p className="mb-4"> {patientData.email}</p>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Sale Items:</h3>
            {saleItems.length > 0 ? (
              saleItems.map((item, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <span className="font-semibold">Product Name:</span>{" "}
                    {item.productName}
                  </p>
                  <p>
                    <span className="font-semibold">Days Until Refill:</span>{" "}
                    {item.daysUntilRefill}
                  </p>
                  <p>
                    <span className="font-semibold">Order Date:</span>{" "}
                    {item.orderDate}
                  </p>
                </div>
              ))
            ) : (
              <p>No sale items available.</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="productName"
              className="text-gray-700 font-semibold"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={handleProductNameChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="daysUntilRefill"
              className="text-gray-700 font-semibold"
            >
              Days Until Refill:
            </label>
            <input
              type="text"
              id="daysUntilRefill"
              name="daysUntilRefill"
              value={daysUntilRefill}
              onChange={handleDaysUntilRefillChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToSale}
          >
            Add to Sale
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Services;
