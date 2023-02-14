import React, { useState } from "react";
import { useDispatch } from "react-redux";
import bg from "../images/messageBubblebgCut.png";
import logo from "../images/logo.png";
import { signup } from "../store/authSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const [data, setdata] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [err, seterr] = useState(false);
  const handleChange = (e) => {
    seterr(false);
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      let formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("profilePic", data.profilePic);
      // send data to backend
      dispatch(signup(formData));
      // reset form
      let fields = document.querySelectorAll("input");
      fields.forEach((item) => {
        item.value = "";
      });
    } else {
      seterr(true);
    }
    window.open('http://localhost:3000','_self')

  };
  return (
    <div className="relative">
      <img src={bg} className="w-full object-cover h-screen absolute" alt="" />
      <div className="w-screen h-screen">
        <div className="absolute flex items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="w-3/4 sm:w-3/5 md:w-6/12 lg:w-2/6 "
          >
            <img
              src={logo}
              alt=""
              className="sm:w-48 w-36 my-2 bg-white p-1 rounded-lg"
            />
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Username
              </label>
              <input
                onChange={handleChange}
                name="username"
                type="text"
                id="username"
                className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mr-2 mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your password
              </label>
              {err && (
                <span className="text-red-700">*Passwords is different</span>
              )}
              <input
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="repeat-password"
                className=" mb-2 text-sm font-medium text-white dark:text-white mr-3"
              >
                Repeat password
              </label>
              {err && (
                <span className="text-red-700">*Passwords is different</span>
              )}
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                id="repeat-password"
                className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Profile picture
              </label>
              <input
                onChange={(e) => {
                  setdata({ ...data, [e.target.name]: e.target.files[0] });
                }}
                name="profilePic"
                type="file"
                accept="image/*"
                id="profilePic"
                className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-medium text-white dark:text-gray-300"
              >
                I agree with the{" "}
                <a
                  href="/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
