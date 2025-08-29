import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginAction } from "../../redux/slice/authSlice";
import { loginAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";

//!validations
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required to authenticate"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          dispatch(loginAction(data));
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/dashboard");
      }
    }, 2000);
  }, [isPending, isError, error, isSuccess]);

  return (
    <div className="relative bg-yellow-100 min-h-screen flex items-center justify-center overflow-hidden text-yellow-900">
      {/* Honeycomb animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      {/* Login form */}
      <form
        onSubmit={formik.handleSubmit}
        className="relative max-w-md w-full bg-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-yellow-700 text-center drop-shadow-md">
           Login
        </h2>

        {isPending && <AlertMessage type="loading" message="Logging in..." />}
        {isError && (
          <AlertMessage type="error" message={error.response.data.message} />
        )}
        {isSuccess && <AlertMessage type="success" message="Login Success" />}

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
        >
          Join the Hive 🐝 
        </button>
      </form>

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

export default LoginForm;
