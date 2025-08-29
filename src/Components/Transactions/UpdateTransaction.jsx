import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { FaCalendarAlt, FaRegCommentDots, FaRupeeSign, FaWallet } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { listTransactionsAPI, updateTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  type: Yup.string().oneOf(["income", "expense"]).required("Type is required"),
  amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutateAsync, isLoading: isPending, isError: isErrorTxn, error: txnError, isSuccess } = useMutation({
    mutationFn: updateTransactionAPI,
    mutationKey: ["update-transaction"],
  });

  const { data: categories, isLoading: catLoading, isError: catError, error: catErrorMsg } = useQuery({
    queryKey: ["list-categories"],
    queryFn: listCategoriesAPI,
  });

  const { data: transaction, isLoading: txnLoading, isError: txnFetchError, error: txnFetchErrorMsg } = useQuery({
    queryKey: ["list-transactions", id],
    queryFn: () => listTransactionsAPI(id),
  });

  const formik = useFormik({
    initialValues: {
      type: transaction?.type || "",
      amount: transaction?.amount || "",
      category: transaction?.category || "Uncategorized",
      date: transaction?.date ? new Date(transaction.date).toISOString().split("T")[0] : "",
      description: transaction?.description || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateAsync({ ...values, id })
        .then(() => navigate("/dashboard"))
        .catch((e) => console.log(e));
    },
  });

  if (txnLoading || catLoading) return <p className="text-center text-yellow-900 mt-10">Loading...</p>;
  if (txnFetchError) return <AlertMessage type="error" message={txnFetchErrorMsg?.message || "Failed to load transaction"} />;
  if (catError) return <AlertMessage type="error" message={catErrorMsg?.message || "Failed to load categories"} />;

  return (
    <div className="relative min-h-screen bg-yellow-100 flex justify-center items-start px-4 py-10 overflow-hidden text-yellow-900">
      {/* Honeycomb animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full max-w-lg bg-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-6"
      >
        <h2 className="text-2xl font-extrabold text-yellow-700 text-center drop-shadow-md">
          Update Transaction
        </h2>

        {/* Alerts */}
        {isPending && <AlertMessage type="loading" message="Updating transaction..." />}
        {isErrorTxn && <AlertMessage type="error" message={txnError?.message || "Error"} />}
        {isSuccess && <AlertMessage type="success" message="Transaction updated successfully!" />}

        {/* Type */}
        <div className="flex flex-col space-y-1">
          <label className="flex gap-2 items-center font-medium text-yellow-800">
            <FaWallet className="text-yellow-700" /> Type
          </label>
          <select
            {...formik.getFieldProps("type")}
            className="w-full p-2 border border-yellow-400 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formik.touched.type && formik.errors.type && <p className="text-red-500 text-xs">{formik.errors.type}</p>}
        </div>

        {/* Amount */}
        <div className="flex flex-col space-y-1">
          <label className="flex gap-2 items-center font-medium text-yellow-800">
            <FaRupeeSign className="text-yellow-700" /> Amount
          </label>
          <input
            type="number"
            placeholder="Amount"
            {...formik.getFieldProps("amount")}
            className="w-full p-2 border border-yellow-400 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          />
          {formik.touched.amount && formik.errors.amount && <p className="text-red-500 text-xs">{formik.errors.amount}</p>}
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-1">
          <label className="flex gap-2 items-center font-medium text-yellow-800">
            <FaRegCommentDots className="text-yellow-700" /> Category
          </label>
          <select
            {...formik.getFieldProps("category")}
            className="w-full p-2 border border-yellow-400 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && <p className="text-red-500 text-xs">{formik.errors.category}</p>}
        </div>

        {/* Date */}
        <div className="flex flex-col space-y-1">
          <label className="flex gap-2 items-center font-medium text-yellow-800">
            <FaCalendarAlt className="text-yellow-700" /> Date
          </label>
          <input
            type="date"
            {...formik.getFieldProps("date")}
            className="w-full p-2 border border-yellow-400 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          />
          {formik.touched.date && formik.errors.date && <p className="text-red-500 text-xs">{formik.errors.date}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-1">
          <label className="flex gap-2 items-center font-medium text-yellow-800">
            <FaRegCommentDots className="text-yellow-700" /> Description
          </label>
          <textarea
            rows={3}
            placeholder="Optional"
            {...formik.getFieldProps("description")}
            className="w-full p-2 border border-yellow-400 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
        >
          Update Transaction 🐝
        </button>
      </form>

      {/* Honeycomb animation */}
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

export default UpdateTransaction;
