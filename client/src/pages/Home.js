import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatSection from "../components/ChatSection";
import Conversation from "../components/Conversation";
import Navbar from "../components/Navbar";
import { conversation, recieverData } from "../store/conversationSlice";
import { getMessages } from "../store/messageSlice";



const Home = ({socket}) => {
  const conversations = useSelector((state) => state.conversation.data);
  const reciever = useSelector((state) => state.conversation.id);
console.log(reciever)
  const messages = useSelector((state) => state.message.data);
  const [messageArray, setMessageArray] = useState([])
  const [dataForChatSection, setdataForChatSection] = useState({user:undefined,messages:undefined})
  const dispatch = useDispatch();

  const windowSize = useRef(window.innerWidth);
  const [sectionSHow, setsectionSHow] = useState({
    messageSection: false,
    conversationSection: true,
  });


   const handleConversationClick = (data) => {
    dispatch(recieverData(data))
    if (windowSize.current >= 640) {      
      setsectionSHow({ messageSection: true, conversationSection: false });
    }
    // get messages belong this user 
    dispatch(getMessages(data._id))
    console.log(reciever)
  };
  useEffect(() => {
    setdataForChatSection({user:reciever})

  }, [reciever])
  
  useEffect(() => {
 setdataForChatSection({...dataForChatSection,messages:messages})
 setMessageArray(messages?.messages)
  }, [messages])
  
  useEffect(() => {
    if (windowSize.current >= 640) {
      setsectionSHow({ messageSection: true, conversationSection: true });
    }
    //  getting conversations
    dispatch(conversation());
  }, []);


  

  return (
    <div className="relative">
      <Navbar />
      <div className="sm:flex">
        {sectionSHow.conversationSection && (
          <div className="sm:w-[45%] md:w-2/5 lg:w-1/4 overflow-y-scroll h-[calc(100vh-50px)] bg-slate-200 p-3 transition-all">
            {conversations.length &&
              conversations?.map((item) => (
                <Conversation data={item} show={handleConversationClick} />
              ))}
          </div>
        )}
        {sectionSHow && (
          <div className="w-full transition-all">
            <ChatSection data={dataForChatSection} messageArray={messageArray} setMessageArray={setMessageArray} show={setsectionSHow} socket={socket} />
          </div>
        )}
      </div>
<div>

</div>
    </div>
  );
};

export default Home;
