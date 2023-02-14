import React, { useEffect, useRef } from "react";
const Conversation = ({ data,show }) => {

  return (
    <div className="my-3">
      <button onClick={()=>{show(data)}} >
        <div className="flex items-center">
          <img className="w-12 rounded-full mr-3" src={process.env.REACT_APP_API+'/'+data.profilePic} alt="" />
          <p className="text-">{data.username}</p>
        </div>
      </button>
    </div>
  );
};

export default Conversation;
