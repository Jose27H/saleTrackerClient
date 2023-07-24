import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/header/Navbar";
import Home from "./pages/1.home/Home";
import Services from "./pages/2.sales/SalePage";
import CustomerTable from "./pages/3.customers/CustomerTable";
import ExistingSale from "./pages/2.sales/ExistingSale";
import ClosedSaleList from "./pages/2.sales/ClosedSaleList";
import SaleHome from "./pages/2.sales/SaleHome";
import SaleList from "./pages/2.sales/SaleList";
import "./App.css";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Customers" element={<CustomerTable />} />
          <Route path="/ExistingSale" element={<ExistingSale />} />
          <Route path="/ClosedSaleList" element={<ClosedSaleList />} />
          <Route path="/SaleList" element={<SaleList />} />
          <Route path="/Sales" element={<SaleHome />} />
        </Routes>
      </Router>
    </div>
  );
}
