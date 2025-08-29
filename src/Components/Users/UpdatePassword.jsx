// import { useMutation } from "@tanstack/react-query";
// import { useFormik } from "formik";
// import React from "react";
// import { AiOutlineLock } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
// import { logoutAction } from "../../redux/slice/authSlice";
// import { changePasswordAPI } from "../../services/users/userServices";
// import AlertMessage from "../Alert/AlertMessage";

// const validationSchema = Yup.object({
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters long")
//     .required("Password is required"),
// });

// const UpdatePassword = () => {
//   const dispatch = useDispatch();

//   const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
//     mutationFn: changePasswordAPI,
//     mutationKey: ["change-password"],
//   });

//   const formik = useFormik({
//     initialValues: {
//       password: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const payload = { newPassword: values.password };
//         await mutateAsync(payload);
//         dispatch(logoutAction());
//         localStorage.removeItem("userInfo");
//       } catch (e) {
//         console.log(e);
//       }
//     },
//   });

//   return (
//     <div className="relative w-full bg-yellow-100 flex flex-col items-center justify-center px-4 py-6 overflow-hidden text-yellow-900">
//       {/* Honeycomb animated background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

//       <div className="relative w-full max-w-md bg-yellow-50 p-6 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-6">
//         <h2 className="text-2xl font-extrabold text-center text-yellow-700 drop-shadow-md">
//           Change Your Password
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-4">
//           <div className="relative">
//             <label
//               htmlFor="new-password"
//               className="block text-sm font-medium text-yellow-800 mb-2"
//             >
//               New Password
//             </label>
//             <div className="flex items-center border border-yellow-400 rounded-lg bg-yellow-100 py-2 px-3">
//               <AiOutlineLock className="text-yellow-700 mr-2" />
//               <input
//                 id="new-password"
//                 type="password"
//                 {...formik.getFieldProps("password")}
//                 placeholder="Enter new password"
//                 className="outline-none flex-1 bg-yellow-100 text-yellow-900"
//               />
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <span className="text-xs text-red-500">
//                 {formik.errors.password}
//               </span>
//             )}
//           </div>

//           {/* Alerts */}
//           {isPending && <AlertMessage type="loading" message="Updating..." />}
//           {isError && (
//             <AlertMessage
//               type="error"
//               message={error.response?.data?.message || "Error"}
//             />
//           )}
//           {isSuccess && (
//             <AlertMessage
//               type="success"
//               message="Password Updated Successfully"
//             />
//           )}

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
//           >
//             Update Password 🐝
//           </button>
//         </form>
//       </div>

//       {/* Honeycomb animation CSS */}
//       <style>{`
//         @keyframes honeycomb-move {
//           0% { background-position: 0 0; }
//           50% { background-position: 20px 20px; }
//           100% { background-position: 0 0; }
//         }
//         .animate-honeycomb {
//           animation: honeycomb-move 10s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UpdatePassword;

