import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";

//! Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then(() => console.log("Registration Success"))
        .catch((e) => console.log(e));
    },
  });

  // Redirect on successful registration after 2 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="relative bg-yellow-100 min-h-screen flex items-center justify-center px-4 overflow-hidden text-yellow-900">
      {/* Honeycomb animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      <form
        onSubmit={formik.handleSubmit}
        className="relative max-w-md w-full bg-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center drop-shadow-md">
          Sign Up
        </h2>

        {isLoading && <AlertMessage type="loading" message="Registering..." />}
        {isError && (
          <AlertMessage type="error" message={error.response?.data?.message} />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Registration Success! Redirecting..."
          />
        )}

        {/* Username */}
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-yellow-700" />
          <input
            type="text"
            placeholder="Username"
            {...formik.getFieldProps("username")}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
          />
          {formik.touched.username && formik.errors.username && (
            <span className="text-xs text-red-500">{formik.errors.username}</span>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-yellow-700" />
          <input
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-yellow-700" />
          <input
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">{formik.errors.password}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-yellow-700" />
          <input
            type="password"
            placeholder="Confirm Password"
            {...formik.getFieldProps("confirmPassword")}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
        >
          Join the Hive 🐝
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

export default RegistrationForm;