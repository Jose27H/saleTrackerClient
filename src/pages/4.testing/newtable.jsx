import React, { useState, useEffect } from "react";
import backendServer from "../../components/BackendServer";

const SalesTable = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`${backendServer}/api/viewReorders`);
        const data = await response.json();
        setSales(data.saleReorderItems);
        alert(data[0].sold_item);
      } catch (error) {
        console.log("error");
      }
    }; //fetchSales
    fetchSales();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sales Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Customer Name</th>
              <th className="text-left">Product Name</th>
              <th className="text-left">Reorder Date</th>
              <th className="text-left">Date Orderdered</th>

              {/* Add more table headers for other columns */}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.reorder_date}>
                <td className="border-t">{sale.customer_name}</td>
                <td className="border-t">{sale.sold_item}</td>
                <td className="border-t">{formatDate(sale.reorder_date)}</td>
                <td className="border-t">{formatDate(sale.sale_date)}</td>

                {/* Add more table data cells for other columns */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; //end

export default SalesTable;
