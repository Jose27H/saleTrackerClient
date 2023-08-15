import React, { useState, useEffect } from "react";

const ExistingSale = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    saleID: "",
    notes: "",
  });
  const [productName, setProductName] = useState("");
  const [daysUntilRefill, setDaysUntilRefill] = useState("");
  const [price, setPrice] = useState("");
  const [saleItems, setSaleItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [notesValue, setNotesValue] = useState("");

  const customerPhoneNumber = sessionStorage.getItem("customerPhoneNumber");
  const saleID = sessionStorage.getItem("saleID");

  const fetchCustomerData = () => {
    fetch(
      `https://saletrackerserver-production.up.railway.app/api/customerData?phoneNumber=${customerPhoneNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCustomerData(data);
        console.log(customerData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSaleItems = () => {
    fetch(
      `https://saletrackerserver-production.up.railway.app/api/saleItems?saleID=${saleID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setSaleItems(data.items);

        setTotal(data.totalPrice);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleNotesChange = (event) => {
    setCustomerData({ ...customerData, notes: event.target.value });
  };

  const handleUpdateNotes = () => {
    // Send the updated notes to the backend
    fetch(
      `https://saletrackerserver-production.up.railway.app/api/updateNotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          saleID: saleID,
          notes: customerData.notes, // Use the updated notes value
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Notes updated:", data);
        alert("Note Updated!");
        // Optionally, you can display a success message or update the UI
      })
      .catch((error) => {
        console.error("Error updating notes:", error);
      });
  };

  useEffect(() => {
    if (customerData.saleID) {
      fetchSaleItems();
    }
  }, [customerData.saleID]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDaysUntilRefillChange = (event) => {
    setDaysUntilRefill(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const calculateDaysDifference = (reorderDate) => {
    const today = new Date();
    const orderDate = new Date(reorderDate);
    const timeDifference = Math.abs(today - orderDate);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const handleAddtoSale = () => {
    const newItem = {
      productName,
      daysUntilRefill,
      price,
    };

    // Send the data to the backend
    fetch("https://saletrackerserver-production.up.railway.app/api/addToSale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saleID: saleID,
        ...newItem,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Item added to sale:", data);
        setProductName("");
        setDaysUntilRefill("");
        setPrice("");
        fetchSaleItems(); // Fetch updated sale items after adding a new item
      })
      .catch((error) => {
        console.error("Error adding item to sale:", error);
      });
  };

  const handleCloseSale = () => {
    // Send the current sale ID to the backend
    fetch(
      `https://saletrackerserver-production.up.railway.app/api/closeSale/${saleID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Sale closed:", data);
        window.location.href = "/";
        // Handle the response from the backend, if needed
        // For example, you can update the UI or show a success message
      })
      .catch((error) => {
        console.error("Error closing sale:", error);
      });
  };

  return (
    <div className="flex justify-center bg-gray-500 min-h-screen ">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg min h-2/3">
        <h2 className="text-2xl font-bold mb-4">{customerData.name}</h2>

        <label htmlFor="saleID" className="text-gray-700 font-semibold mb-1">
          Sale ID:
        </label>
        <p className="mb-2">{saleID}</p>
        <label
          htmlFor="phoneNumber"
          className="text-gray-700 font-semibold mb-1"
        >
          Phone Number:
        </label>
        <p className="mb-2">{customerData.phoneNumber}</p>

        <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
          Email:
        </label>
        <p className="mb-4">{customerData.email}</p>
        <div className="mb-4">
          <h1>Notes:</h1>

          <textarea
            value={customerData.notes}
            onChange={handleNotesChange}
            className="px-4 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpdateNotes}
          >
            Update Notes
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Sale Items:</h3>
          {saleItems.length > 0 ? (
            saleItems.map((item, index) => (
              <div key={index} className="mb-2">
                <p>
                  <span className="font-semibold">Product Name:</span>{" "}
                  {item.item_name}
                </p>
                <p>
                  <span className="font-semibold">Days Until Refill:</span>{" "}
                  {calculateDaysDifference(item.reorder_date)}
                </p>

                <p>
                  <span className="font-semibold">Price:</span> ${item.price}
                </p>
                <p>
                  <span className="font-semibold">Has been contacted? :</span>{" "}
                  {item.hascalled ? "Yes" : "No"}
                </p>
              </div>
            ))
          ) : (
            <p>No sale items available.</p>
          )}
        </div>
        <p>
          <span className="font-semibold">Total:</span> ${total}
        </p>

        <div className="mb-4">
          <label htmlFor="productName" className="text-gray-700 font-semibold">
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

        <div className="mb-4">
          <label htmlFor="price" className="text-gray-700 font-semibold">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddtoSale}
        >
          Add to Sale
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleCloseSale}
        >
          Mark as Contacted
        </button>
      </div>
    </div>
  );
};

export default ExistingSale;
