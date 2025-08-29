import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { logoutAction } from "../../redux/slice/authSlice";
import { updateProfileAPI, changePasswordAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  const dispatch = useDispatch();

  // ✅ get user info from redux or fallback to localStorage
  const { user } = useSelector((state) => state.auth) || {};
  const userInfo = user || JSON.parse(localStorage.getItem("userInfo"));

  // Update profile mutation
  const {
    mutateAsync: updateProfile,
    isPending: profilePending,
    isError: profileError,
    error: profileErrorMsg,
    isSuccess: profileSuccess,
  } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update-profile"],
  });

  // Change password mutation
  const {
    mutateAsync: changePassword,
    isPending: passwordPending,
    isError: passwordError,
    error: passwordErrorMsg,
    isSuccess: passwordSuccess,
  } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-password"],
  });

  // Formik for profile update (pre-filled with current user info)
  const profileFormik = useFormik({
    initialValues: {
      username: userInfo?.username || "",
      email: userInfo?.email || "",
    },
    enableReinitialize: true, // ✅ makes sure values update if userInfo changes
    onSubmit: async (values) => {
      try {
        await updateProfile(values);
      } catch (e) {
        console.log(e);
      }
    },
  });

  // Formik for password update
  const passwordFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await changePassword({ newPassword: values.password });
        dispatch(logoutAction());
        localStorage.removeItem("userInfo");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="relative w-full min-h-screen bg-yellow-100 flex flex-col items-center px-4 py-10 overflow-hidden text-yellow-900">
      {/* Honeycomb animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

      <div className="relative w-full max-w-3xl bg-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-8">
        <h1 className="text-3xl font-extrabold text-yellow-700 text-center drop-shadow-md">
          Your Hive Profile 🐝
        </h1>

        {/* ------------------ Display User Info ------------------ */}
        {userInfo && (
          <div className="bg-yellow-200 p-4 rounded-xl shadow-md text-center space-y-2">
            <p className="text-xl font-bold text-yellow-900 flex items-center justify-center gap-2">
              <FaUserCircle className="text-yellow-700" /> {userInfo.username || "No Name"}
            </p>
            <p className="text-md text-yellow-800 flex items-center justify-center gap-2">
              <FaEnvelope className="text-yellow-700" /> {userInfo.email || "No Email"}
            </p>
          </div>
        )}

        {/* ------------------ Update Profile Section ------------------ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-700">Update Profile</h2>

          {profilePending && <AlertMessage type="loading" message="Updating profile..." />}
          {profileError && (
            <AlertMessage
              type="error"
              message={profileErrorMsg.response?.data?.message || "Error"}
            />
          )}
          {profileSuccess && (
            <AlertMessage type="success" message="Profile updated successfully!" />
          )}

          <form onSubmit={profileFormik.handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="flex items-center border border-yellow-400 rounded-lg bg-yellow-100 py-2 px-3">
              <FaUserCircle className="text-yellow-700 mr-2" />
              <input
                type="text"
                placeholder="Username"
                {...profileFormik.getFieldProps("username")}
                className="flex-1 bg-yellow-100 outline-none text-yellow-900"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-yellow-400 rounded-lg bg-yellow-100 py-2 px-3">
              <FaEnvelope className="text-yellow-700 mr-2" />
              <input
                type="email"
                placeholder="Email"
                {...profileFormik.getFieldProps("email")}
                className="flex-1 bg-yellow-100 outline-none text-yellow-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* ------------------ Update Password Section ------------------ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-700">Change Password</h2>

          {passwordPending && <AlertMessage type="loading" message="Updating password..." />}
          {passwordError && (
            <AlertMessage
              type="error"
              message={passwordErrorMsg.response?.data?.message || "Error"}
            />
          )}
          {passwordSuccess && (
            <AlertMessage type="success" message="Password updated successfully!" />
          )}

          <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
            <div className="flex items-center border border-yellow-400 rounded-lg bg-yellow-100 py-2 px-3">
              <AiOutlineLock className="text-yellow-700 mr-2" />
              <input
                type="password"
                placeholder="New Password"
                {...passwordFormik.getFieldProps("password")}
                className="flex-1 bg-yellow-100 outline-none text-yellow-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
            >
              Update Password
            </button>
          </form>
        </div>
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

export default UserProfile;
