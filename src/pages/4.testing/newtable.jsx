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

  const handleReordered = (soldItem, saleID) => {
    fetch(
      `${backendServer}/api/handleReorder?soldItem=${soldItem}&saleID=${saleID}`
    )
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Items Left For Reorder
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the items that need reordering.
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Customer Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Item
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Sale Date
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Reorder Date
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">REORDERED!</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sales.map((sale) => (
              <tr key={sale.row_id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {sale.customer_name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Item</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {sale.sold_item}
                    </dd>
                    <dt className="sr-only sm:hidden">rSale Date</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {formatDate(sale.sale_date)}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {sale.sold_item}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {formatDate(sale.sale_date)}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {formatDate(sale.reorder_date)}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => handleReordered(sale.sold_item, sale.saleid)}
                    className="text-red-600 hover:text-indigo-900"
                  >
                    Ordered
                    <span className="sr-only">, {sale.customer_name}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SalesTable;
