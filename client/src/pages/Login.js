import React, {  useState } from "react";
import { useDispatch,  } from "react-redux";
import bg from "../images/messageBubblebgCut.png";
import logo from "../images/logo.png";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
  const [data, setdata] = useState({
    username: "",
    password: "",
  });


  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(data))
    // reset form
    let fields = document.querySelectorAll("input");
    fields.forEach((item) => {
      item.value = "";
    });
    navigate('/')
    window.open('http://localhost:3000','_self')
  };

  
  return (
    <div className="relative">
      <img src={bg} className="w-full object-cover h-screen absolute" alt="" />
      <div className="w-screen h-screen">
        <div className="absolute flex items-center justify-center w-full h-full">
          <form className="w-3/4 sm:w-3/5 md:w-6/12 lg:w-2/6 ">
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
              name='username'
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
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your password
              </label>
              <input
              onChange={handleChange}
              name='password'
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

            <button
            onClick={handleSubmit}
              className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
