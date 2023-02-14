import React, { useEffect, useRef, useState } from "react";
import dotIcon from "../images/threeDot.png";
import Message from "./Message";
import arrow from "../images/backArrow.png";
import { useDispatch, useSelector } from "react-redux";
import { postMessage } from "../store/messageSlice";

const ChatSection = ({ data, show, socket, messageArray, setMessageArray }) => {
  const msg = data.messages;
  console.log(data)
  const scrollRef = useRef()
  const user = useSelector((state) => state.user.data);
  const [messageMenu, setmessageMenu] = useState(false);
  const [newMessage, setNewMessage] = useState({message:''})
  const [inputMessage, setInputMessage] = useState({ message: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputMessage({ ...inputMessage, [e.target.name]: e.target.value });
  };

  let recieverId = data.user?._id;
  const handleSubmit = (e) => {
    let data = {
      message: inputMessage,
      conversationId: msg?.conversationId,
      recieverId: recieverId,
    };
    e.preventDefault();
    dispatch(postMessage(data));
    socket.current.emit("newMessage", {
      recieverId,
      senderId: user.token.userId,
      text: inputMessage,
    });
    setInputMessage({message:''})
  };

  useEffect(() => {
    socket.current.on("newMessage", (d) => {
      let data = {
        senderId: d.senderId,
        message: d.text.message,
        date: Date.now(),
      };
      setNewMessage(data)
      
    });
  }, []);
// pushing new message coming from socket to messages 
useEffect(() => {
  !messageArray && newMessage && setMessageArray([newMessage])
 messageArray && setMessageArray([...messageArray,newMessage])
//  scrollRef.current && scrollRef?.current.scrollIntoView({ behavior: 'smooth' })

}, [newMessage])


  return (
    <div className="bg-yellow-300 w-full h-full">
      {/* top bar */}
      {!data.user && (
        <div className="text-center text-slate-500 text-3xl p-6">
          Please click on a conversation to start chat
        </div>
      )}
      {data.user && (
        <div>
          <div className="bg-blue-400 relative">
            <div className="px-4 py-1 flex justify-between">
              <div className="flex items-center relative">
                <div className="relative w-12 mr-3">
                  <img
                    className=" rounded-full object-cover w-9"
                    src={process.env.REACT_APP_API + "/" + data.user.profilePic}
                    alt=""
                  />
                </div>
                <div className="leading-3">
                  <p className="text-white text-base">{data.user?.username}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (messageMenu) {
                    setmessageMenu(false);
                  } else {
                    setmessageMenu(true);
                  }
                }}
              >
                <img className="w-6" src={dotIcon} alt="" />
              </button>
            </div>
            {messageMenu && (
              <div className="flex flex-col items-start absolute z-10 right-1 xs:right-2 sm:right-3 md:right-4 bg-yellow-600 text-white p-2 rounded-lg">
                <button>Clear chat</button>
                <button>About Friend</button>
                <button>ChitChat</button>
              </div>
            )}
          </div>

          {/* messages */}
          <div className="bg-yellow-300 overflow-y-scroll h-[calc(100vh-147px)] relative" ref={scrollRef}>
            {messageArray &&
              messageArray?.map((message) => (
               <div ref={scrollRef}>
                 <Message
                  data={message}
                  pic={data.user.profilePic}
                  own={message.senderId === user.token.userId ? true : false}
                />
               </div>
              ))}
          </div>
          {/* send message section */}
          <div>
            <div className="flex p-2 w-full border-t px-2  border-slate-400 relative">
              <button
                className=" absolute -top-9 right-2 md:right-7 md:-top-12 w-8"
                onClick={() => {
                  show({ messageSection: false, conversationSection: true });
                }}
              >
                <img src={arrow} alt="" />
              </button>
              <form onSubmit={handleSubmit} className="flex w-full">
                <input
                  className="  w-full h-8 outline-none px-1 mx-1 rounded-lg"
                  name="message"
                  onChange={handleChange}
                  placeholder="Write something..."
                  autoComplete="off"
                  value={inputMessage.message}
                  required
                ></input>
                <button type="submit" className="text-blue-700 font-semibold">
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
