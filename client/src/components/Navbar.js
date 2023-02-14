import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";

import logo from "../images/logo.png";
import { logout } from "../store/authSlice";
import { recieverData } from "../store/conversationSlice";
import { getMessages } from "../store/messageSlice";
import { search, set } from "../store/searchSlice";

const Navbar = () => {
const [serchTerm, setSerchTerm] = useState('');
const searchResult = useSelector(state=>state.search.data)
const navigate=useNavigate()
const dispatch =useDispatch()
const handleChange=(e)=>{
setSerchTerm(e.target.value)
}
const handleSubmit=(e)=>{
e.preventDefault();
const data ={value:serchTerm}
dispatch(search(data))
}

const handleClick=()=>{
  dispatch(recieverData(searchResult?.resultUser))

  dispatch(set())
  dispatch(getMessages(searchResult?.resultUser._id))
}
// useEffect(() => {
//   recieverData(searchResult?.resultUser)

// }, [searchResult])


  return (
    <div className="relative">
      <nav className="bg-slate-200 p-2 flex items-center justify-between">
      <div>
        <img src={logo} className="w-20 " alt="" />
      </div>
      <div>
        <div className="border border-slate-600 p-1 mx-2 rounded-md">
          <form className="flex relative" onSubmit={handleSubmit}>
            <input
              className="outline-0 bg-slate-200 border-black text-xs xs:text-base"
              placeholder="Search friends..."
              type="text"
              onChange={handleChange}
              required
            />
                {searchResult.success &&  <button className="top-7 absolute z-30" onClick={handleClick}><div className="bg-blue-400  w-64  flex px-3 py-1 rounded-xl items-center">
                    <img className="rounded-full w-14 mr-4" src={`${process.env.REACT_APP_API}/${searchResult?.resultUser?.profilePic}`} alt="" />
                    <p className="text-xl text-white">{searchResult?.resultUser?.username}</p>
                  </div></button>}

            <button className=" ml-1 font-medium text-blue-600 text-xs xs:text-base">Search</button>
          </form>
        </div>
      </div>
      <div>
        <button onClick={()=>{
          dispatch(logout())
          // axios.get(`${process.env.REACT_APP_API}/auth/logout`)
          navigate('/login')
        }} className="text-red-500 text-xs xs:text-base">Logout</button>
      </div>
    </nav>
    </div>
    
  );
};

export default Navbar;
