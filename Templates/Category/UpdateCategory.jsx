import { useFormik } from "formik";
import React from "react";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const UpdateCategory = ({ categoryData = {} }) => {
  const formik = useFormik({
    initialValues: {
      type: categoryData?.type || "",
      name: categoryData?.name || "",
    },
    validationSchema,
    onSubmit: (values) => {
      // handle update logic here
      console.log("Updated category:", values);
    },
  });

  return (
    <div className="relative min-h-screen bg-yellow-100 flex flex-col items-center px-4 py-8 text-yellow-900">
      {/* Honeycomb background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full max-w-lg bg-yellow-50 p-6 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-yellow-700">
            Update Category
          </h2>
          <p className="text-yellow-800">Fill in the details below.</p>
        </div>

        {/* Category Type */}
        <div className="space-y-2">
          <label
            htmlFor="type"
            className="flex gap-2 items-center text-yellow-900 font-medium"
          >
            <FaWallet className="text-yellow-700" />
            <span>Type</span>
          </label>
          <select
            {...formik.getFieldProps("type")}
            id="type"
            className="w-full p-2 mt-1 border border-yellow-400 rounded-lg bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
          >
            <option value="">Select transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-xs">{formik.errors.type}</p>
          )}
        </div>

        {/* Category Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-yellow-900 font-medium">
            <SiDatabricks className="inline mr-2 text-yellow-700" />
            Name
          </label>
          <input
            type="text"
            {...formik.getFieldProps("name")}
            placeholder="Name"
            id="name"
            className="w-full mt-1 border border-yellow-400 rounded-lg bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 py-2 px-3"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-2xl shadow-lg transition-colors duration-200 transform hover:-translate-y-1"
        >
          Update Category
        </button>
      </form>

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

export default UpdateCategory;
