import React, { useState } from "react";
import TransactionChart from "../Transactions/TransactionChart";
import TransactionList from "../Transactions/TransactionList";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  return (
    <>
      {/* Pass filters to both */}
      <TransactionChart filters={filters} />
      <TransactionList filters={filters} setFilters={setFilters} />
    </>
  );
};

export default Dashboard;