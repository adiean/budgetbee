import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
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
  const [showSpinner, setShowSpinner] = useState(false);

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["add-category"],
  });

  const formik = useFormik({
    initialValues: { type: "", name: "" },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then(() => {
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
            navigate("/categories");
          }, 2000);
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-3xl shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-yellow-900">
          Add New Category
        </h2>
        <p className="text-yellow-700">Fill in the details below.</p>
      </div>

      {/* Alert messages */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something went wrong. Please try again."
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Category added successfully, redirecting..."
        />
      )}

      {/* Category Type */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-yellow-900 font-medium"
        >
          <FaWallet className="text-yellow-600" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="w-full p-2 mt-1 border border-yellow-300 rounded-xl shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
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
          <SiDatabricks className="inline mr-2 text-yellow-600" />
          Name
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="Name"
          id="name"
          className="w-full mt-1 border border-yellow-300 rounded-xl shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 py-2 px-3"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-xl shadow-md focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default AddCategory;
