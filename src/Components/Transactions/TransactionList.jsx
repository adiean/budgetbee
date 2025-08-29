import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { listCategoriesAPI } from "../../services/category/categoryService";
import {
  deleteTransactionAPI,
  listTransactionsAPI,
} from "../../services/transactions/transactionService";

const TransactionList = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ startDate: "", endDate: "", type: "", category: "" });
  };

  const { data: categoriesData } = useQuery({
    queryKey: ["list-categories"],
    queryFn: listCategoriesAPI,
  });

  const { data: transactions, refetch } = useQuery({
    queryKey: ["list-transactions", filters],
    queryFn: () => listTransactionsAPI(filters),
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteTransactionAPI,
    mutationKey: ["delete-transaction"],
  });

  const handleDelete = (id) =>
    mutateAsync(id).then(refetch).catch(console.log);

  return (
    <div className="relative min-h-screen bg-yellow-100 px-4 py-10 text-yellow-900">
      {/* Honeycomb background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      <div className="relative max-w-7xl mx-auto bg-yellow-50 shadow-2xl border border-yellow-400 rounded-3xl p-6 space-y-6 z-10">
        <h2 className="text-2xl font-extrabold text-yellow-700 text-center mb-6">
          Transaction List
        </h2>

        {/* Filters */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
            {/* Start Date */}
            <div className="flex flex-col">
              <label className="text-yellow-800 font-medium mb-1">From:</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate || ""}
                onChange={handleFilterChange}
                className="p-2 rounded-lg border border-yellow-400 bg-yellow-100 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col">
              <label className="text-yellow-800 font-medium mb-1">To:</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate || ""}
                onChange={handleFilterChange}
                className="p-2 rounded-lg border border-yellow-400 bg-yellow-100 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            {/* Type Filter */}
            <div className="relative flex flex-col">
              <label className="text-yellow-800 font-medium mb-1">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-yellow-400 rounded-lg bg-yellow-100 focus:border-yellow-500 focus:ring-yellow-500 appearance-none"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-2 top-9 text-yellow-700" />
            </div>

            {/* Category Filter */}
            <div className="relative flex flex-col">
              <label className="text-yellow-800 font-medium mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-yellow-400 rounded-lg bg-yellow-100 focus:border-yellow-500 focus:ring-yellow-500 appearance-none"
              >
                <option value="">All Categories</option>
                <option value="Uncategorized">Uncategorized</option>
                {categoriesData?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-2 top-9 text-yellow-700" />
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg shadow-md transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-yellow-400 rounded-lg">
            <thead className="bg-yellow-200">
              <tr>
                {[
                  "Date",
                  "Category",
                  "Type",
                  "Amount",
                  "Description",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-2 px-4 text-left font-semibold text-yellow-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions?.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 px-4 text-center text-yellow-700"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions?.map((txn) => (
                  <tr key={txn._id} className="border-t border-yellow-400">
                    <td className="py-2 px-4">
                      {new Date(txn.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {txn.category || "Uncategorized"}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          txn.type === "income"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      </span>
                    </td>
                    <td className="py-2 px-4">₹{txn.amount.toLocaleString()}</td>
                    <td className="py-2 px-4 italic">
                      {txn.description || "N/A"}
                    </td>
                    <td className="py-2 px-4 flex space-x-3">
                      <Link to={`/update-transaction/${txn._id}`}>
                        <button className="text-yellow-700 hover:text-yellow-900">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(txn._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes honeycomb-move {
          0% { background-position: 0 0; }
          50% { background-position: 20px 20px; }
          100% { background-position: 0 0; }
        }
        .animate-honeycomb {
          animation: honeycomb-move 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TransactionList;
//fix