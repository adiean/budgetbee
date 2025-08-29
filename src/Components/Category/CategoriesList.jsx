import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { deleteCategoryAPI, listCategoriesAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const { data, isError, isLoading, error, refetch, isFetching } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });

  const handleDelete = (id) => {
    mutateAsync(id)
      .then(() => refetch())
      .catch((e) => console.log(e));
  };

  return (
    <div className="relative w-full min-h-screen bg-yellow-100 flex flex-col items-center px-4 py-10 text-yellow-900 overflow-hidden">
      {/* Optional honeycomb background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      <div className="relative w-full max-w-3xl bg-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-yellow-700 text-center drop-shadow-md">
           Categories
        </h1>

        {/* Loading or Error */}
        {isLoading || isFetching ? (
          <div className="flex justify-center">
            <ClipLoader color="#F59E0B" loading={true} size={50} />
          </div>
        ) : isError ? (
          <AlertMessage type="error" message={error?.response?.data?.message} />
        ) : null}

        {/* Categories List */}
        <ul className="space-y-4">
          {data?.map((category) => (
            <li
              key={category?._id}
              className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg shadow-md border border-yellow-200"
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
                  <button className="bg-yellow-500 text-yellow-900 rounded-full p-2 shadow-md hover:bg-yellow-600 hover:-translate-y-1 transition transform">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(category?._id)}
                  className="bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 hover:-translate-y-1 transition transform"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Deleting spinner */}
        {isPending && (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#E53E3E" loading={true} size={30} />
            <span className="ml-2 text-red-500">Deleting...</span>
          </div>
        )}
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

export default CategoriesList;
