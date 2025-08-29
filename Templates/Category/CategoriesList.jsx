import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { deleteCategoryAPI, listCategoriesAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const navigate = useNavigate();

  // Fetch categories
  const { data, isError, isLoading, error, refetch, isFetching } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  // Delete mutation
  const { mutateAsync, isPending, error: categoryErr, isSuccess } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });

  const handleDelete = (id) => {
    mutateAsync(id)
      .then(() => refetch())
      .catch((e) => console.log(e));
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-3xl shadow-xl border border-yellow-200">
      <h2 className="text-2xl font-bold text-yellow-900 mb-4 text-center">Categories</h2>

      {/* Loading or error */}
      {isLoading || isFetching ? (
        <div className="flex justify-center my-4">
          <ClipLoader color="#FBBF24" loading={true} size={50} />
        </div>
      ) : isError ? (
        <AlertMessage
          type="error"
          message={error?.response?.data?.message || "Something went wrong"}
        />
      ) : null}

      {/* Categories List */}
      <ul className="space-y-4">
        {data?.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center bg-yellow-50 p-3 rounded-xl shadow-sm"
          >
            <div>
              <span className="text-yellow-900 font-medium">{category?.name}</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  category.type === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {category?.type?.charAt(0).toUpperCase() + category?.type?.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/update-category/${category._id}`}>
                <button className="text-yellow-600 hover:text-yellow-800">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(category._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Deletion spinner */}
      {isPending && (
        <div className="flex justify-center mt-4">
          <ClipLoader color="#E53E3E" loading={true} size={30} />
          <span className="ml-2 text-red-500">Deleting...</span>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
