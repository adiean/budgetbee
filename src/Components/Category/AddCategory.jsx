import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["add-category"],
  });

  const formik = useFormik({
    initialValues: { type: "", name: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        setTimeout(() => navigate("/categories"), 2000);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="relative w-full min-h-screen bg-yellow-100 flex flex-col items-center px-4 py-10 text-yellow-900 overflow-hidden">
      {/* Honeycomb background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      {/* Form Card */}
      <div className="relative w-full max-w-3xl bg-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-8">
        <h1 className="text-3xl font-extrabold text-yellow-700 text-center drop-shadow-md">
          Add New Category
        </h1>

        {/* Alerts */}
        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Something went wrong."}
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Category added successfully!" />
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Category Type */}
          <div className="flex items-center border border-yellow-400 rounded-lg bg-yellow-100 py-2 px-3">
            <FaWallet className="text-yellow-700 mr-2" />
            <select
              {...formik.getFieldProps("type")}
              className="flex-1 bg-yellow-100 outline-none text-yellow-900"
            >
              <option value="">Select transaction type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-xs italic">{formik.errors.type}</p>
          )}

          {/* Category Name */}
          <div className="flex items-center border border-yellow-400 rounded-lg bg-yellow-100 py-2 px-3">
            <SiDatabricks className="text-yellow-700 mr-2" />
            <input
              type="text"
              placeholder="Category Name"
              {...formik.getFieldProps("name")}
              className="flex-1 bg-yellow-100 outline-none text-yellow-900"
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
          >
            {isPending ? "Adding..." : "Add Category 🐝"}
          </button>
        </form>
      </div>

      {/* Honeycomb animation CSS */}
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

export default AddCategory;
