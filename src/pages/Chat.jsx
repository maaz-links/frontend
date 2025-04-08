import { useState } from "react";
import { FaSearch, FaComments, FaPaperPlane, FaBars, FaArchive } from "react-icons/fa";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState([
    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", time: "11:13", sent: true },
    { text: "Nam diam nulla, dapibus sed felis id, ultrices congue odio.", time: "11:45", sent: false },
    { text: "Maecenas a aliquet tellus. Mauris aliquet nec diam at congue.", time: "12:18", sent: true },
    { text: "Vestibulum consequat vitae turpis porta ultrices.", time: "13:12", sent: false },
    { text: "Lorem ipsum dolor sit amet, consectetur icing elit.", time: "15:08", sent: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, time: "Now", sent: true }]);
      setNewMessage("");
    }
  };

  return (
    <>
    <Header />
    <div className="flex flex-col md:flex-row md:h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4  md:border-r overflow-y-auto">
        <div className="flex justify-center gap-x-[20px] items-center p-2 pt-[17px] pb-[13px] border-b">
          <button className={`px-4 py-2 ${activeTab === "all" ? "bg-[#605C5C] text-white px-[20px] min-w-[133px] text-[16px] font-bold" : "bg-[#AEAEAE] min-w-[133px] text-[16px] font-bold"}`} onClick={() => setActiveTab("all")}>ALL</button>
          <button className={`px-4 py-2 ${activeTab === "archived" ? "bg-[#605C5C] text-white px-[20px] min-w-[133px] text-[16px] font-bold" : "bg-[#AEAEAE] min-w-[133px] text-[16px] font-bold"}`} onClick={() => setActiveTab("archived")}>ARCHIVED</button>
        </div>
        {/* User List */}
        <div className="space-y-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2 p-2 py-[7px] border-b mb-[0px]">
              <div className="w-8 h-8 bg-[#B5B5B5BB] rounded-full"></div>
              <div>
                <p className="text-[16px] font-bold">USER</p>
                <p className="text-[14px] flex items-center gap-x-[5px]"><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="8.66894" cy="7" rx="7.78808" ry="7" fill="#F9D132" fill-opacity="0.666667"/>
</svg>
<span>User:</span>
<span className="font-bold">Hello, my name...</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="md:w-3/4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between p-[40px] pt-[34px] pb-[34px] border-b items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#B5B5B5BB] rounded-full"></div>
            <div>
              <p className="text-[20px] font-bold">USER</p>
              <p className="text-[14px]">Years | City</p>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <button className="px-4 py-1 h-[32px] bg-[#AEAEAE]">Profile</button>
            <button className="px-4 py-1 h-[32px] bg-[#AEAEAE] flex items-center"><FaArchive className="mr-2" />Archive</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-[40px] space-y-4 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex  ${msg.sent ? "justify-end" : "justify-start"}`}>
            <div className={`${msg.sent ? "chat-bubble-right" : "chat-bubble-left"}`}>
         <div className={`${msg.sent ? "chat-bubble-right-inner bg-black p-[15px] rounded-[20px]" : "chat-bubble-left-inner"}`}>     <div className={`p-[15px] md:ps-[60px] max-w-xs ${msg.sent ? "bg-[#d9d9d9] text-black rounded-0 chat-box-gr" : "bg-black text-white  rounded-[20px]"} text-center z-40 relative`}>{msg.text}</div> </div>
              <span className={`${msg.sent ? "mr-auto text-custom" : "ml-[60px]"}`}>{msg.time}</span>
             
              </div>
             
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 mb-[20px] flex items-center">
          <input type="text" placeholder="text here..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 px-[25px] bg-[#AEAEAEAE] focus:outline-0" />
          <button onClick={sendMessage} className="ml-[20px] bg-[#777777] text-black p-2 px-[10px]">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Chat;
