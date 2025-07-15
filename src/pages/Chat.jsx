// import { useState, useEffect, useRef } from "react";
// import { FaSearch, FaComments, FaPaperPlane, FaBars, FaArchive } from "react-icons/fa";
// import Footer from "../components/common/footer";
// import Header from "../components/common/header";
// import axiosClient from "../../axios-client";
// import { getAge, getAttachmentURL, getUserCost } from "../functions/Common";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useStateContext } from "../context/ContextProvider";
// import { ROLES } from "../../constants";
// import { toast } from "react-toastify";
// import { getEcho } from "../../echo";
// //import { useEcho } from "../../echo";
// import RelativeTime from "../functions/RelativeTime";
// import ReportChatButton from "../components/ReportChatButton";
// import { createChat } from "../functions/UnlockChat";

// const Chat = () => {

//   const [activeTab, setActiveTab] = useState("all");
//   const [chats, setChats] = useState([]); //list of chats to show sidebar
//   const [selectedChat, setSelectedChat] = useState(null); //duh
//   const [messages, setMessages] = useState([]); //list of msgs to show on dashboard
//   const [newMessage, setNewMessage] = useState(""); //text field where you'll type new text
//   const [loading, setLoading] = useState(true); //loading for chat sidebar
//   const [pollingInterval, setPollingInterval] = useState(null); //???
//   const messagesEndRef = useRef(null); //Controls scrolling
//   const {user,refreshUser,getProvinceName,profileCosts,checkUnreadMessages} = useStateContext();

//   const [isRead, setReadStatus] = useState(2);

//   const messagesRef = useRef(messages);
//   const messagesContainerRef = useRef(null);

//   const [isTimeout, setIsTimeout] = useState(false);
//   const navigate = useNavigate();

//   const handleTimeout = () => {
//     setIsTimeout(true);
//     setTimeout(() => {
//       setIsTimeout(false);
//     }, 60000); // 60 seconds = 60000 ms
//   };

//   // Fetch chats based on active tab (either 'all' or 'archived')
//   const fetchChats = async () => {
//     try {
//       const response = await axiosClient.get(`/api/chats?type=${activeTab}`);
//       setChats(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching chats:", err);
//       setLoading(false);
//     }
//   };

//   // Fetch messages for selected chat
//   const fetchMessages = async (chatId) => {
//     try {
//       const response = await axiosClient.get(`/api/chats/${chatId}/messages`);
//       const messages = response.data;
//       setMessages(messages);
//       if (messages.length > 0) {
//         const lastMessage = messages[messages.length - 1];
//         // console.log(lastMessage);
//         markLastMessageAsRead(chatId);
//         if (lastMessage.sent === true) {
//           // If message is not sent (assuming this means it's received)

//           if (lastMessage.is_read === 1) {
//             setReadStatus(1);  // Message is read
//           } else {
//             setReadStatus(0); // Message is unread
//           }
//         }
//       }

//       scrollToBottom();
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   // Start polling for new messages
//   const startPolling = (chatId) => {
//     // Clear any existing polling
//     if (pollingInterval) {
//       clearInterval(pollingInterval);
//     }
//     //console.log('pooler',chats);

//     // Start new polling
//     const interval = setInterval(async () => {
//       // console.log('ref',messagesRef.current.length);
//       // console.log(Math.max(...messagesRef.current.map(m => m.id)))
//       const lastMessageId = messagesRef.current.length > 0 ? Math.max(...messagesRef.current.map(m => m.id)) : 0;
//       //console.log(chatId,lastMessageId,messages);
//       try {
//         const response = await axiosClient.get(`/api/chats/${chatId}/messages/poll?last_message_id=${lastMessageId}`);
//         // console.log(response.data);
//         if (response.data.length > 0) {
//           setMessages(prev => [...prev, ...response.data]);
//           scrollToBottom();
//         }
//       } catch (err) {
//         console.error("Error polling messages:", err);
//       }
//     }, 10000); // Poll every 8 seconds

//     setPollingInterval(interval);
//   };

//   // Archive/unarchive chat
//   const toggleArchive = async (chatId, archive) => {
//     try {
//       const endpoint = archive ? 'archive' : 'unarchive';
//       await axiosClient.post(`/api/chats/${chatId}/${endpoint}`);
//       fetchChats(); // Refresh chat list

//       //Update archive status without fetchChats();
//       if (selectedChat?.id === chatId) {
//         setSelectedChat(prev => ({ ...prev, is_archived: archive }));
//       }
//     } catch (err) {
//       console.error("Error toggling archive:", err);
//     }
//   };

//   // Send new message
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !selectedChat) return;

//     try {
//       const response = await axiosClient.post(`/api/chats/${selectedChat.id}/messages`, {
//         message: newMessage
//       });

//       //Message interrupted by moderation
//       if(response.status == 202){
//         toast.warn(response.data.message,{
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//         })
//         setNewMessage("");
//         scrollToBottom();
//         handleTimeout();
//         return;
//       }
//       //console.log(response.data);
//       setMessages(prev => [...prev, {
//         ...response.data,
//         //sentter: true,
//         //id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
//       }]);
//       fetchChats();
//       setReadStatus(0);
//       //console.log('pooler',messages)
//       setNewMessage("");
//       scrollToBottom();
//     } catch (err) {
//       toast.error('Error sending message, Your message must not be greater than 1000 characters.',{
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//       })
//       setNewMessage("");
//       console.error("Error sending message:", err);
//     }
//   };

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     //messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     if (messagesContainerRef.current && messagesEndRef.current) {
//       const container = messagesContainerRef.current;
//       const scrollHeight = messagesEndRef.current.offsetTop;

//       container.scrollTo({
//         top: scrollHeight,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Handle chat selection
//   const handleSelectChat = (chat) => { //Passing chat object
//     setReadStatus(2);
//     setSelectedChat(chat);
//     // console.log('chatter',chat);
//     fetchMessages(chat.id);
//     // startPolling(chat.id);
//   };

//   useEffect(() => {
//     if (!selectedChat) return;
//     const echo = getEcho();
//     // Subscribe to private channel
//     const channel = echo.private(`chatter.${selectedChat.id}`);

//     // Listen for new messages (with Laravel's dot notation)
//     channel.listen('.NewMessage', (data) => {
//       const payload = data.message;
//       const sender_id = data.sender_id
//       // console.log('payload',data)
//       // console.log(payload['sent'] === user.id)
//       // payload['sent'] = payload['sent'] === user.id
//       // if(payload['sent'] == false){
//       if((sender_id === user.id) == false){
//         setMessages(prev => [...prev, payload]);
//         setReadStatus(2);
//         markLastMessageAsRead(selectedChat.id);
//       }

//       // console.log(data.message);
//       // setMessages(prev => [...prev, {
//       //   ...response.data,
//       //   //sentter: true,
//       //   //id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
//       // }]);
//     });

//     channel.listen('.NewMessageAfterMod', (data) => {
//       //fetchMessages(selectedChat.id);
//       handleSelectChat(selectedChat);
//     });

//     // // Subscribe to private channel
//     // const channel2 = echo.private(`chatter.${selectedChat.id}`);

//     // Listen for new messages (with Laravel's dot notation)
//     channel.listen('.MessageRead', (data) => {

//       // console.log('resdbroadcast',data)
//       const currentMsgs = messagesRef.current
//       const lastMessage = currentMsgs[currentMsgs.length - 1];
//       // console.log('resdbroadcast',messages,messages[messages.length - 1]);
//       if(data.messageId == lastMessage.id){
//         if(data.readerId != user.id){
//           setReadStatus(1);
//         }
//       }
//       // setMessages(prev => [...prev, {
//       //   ...response.data,
//       //   //sentter: true,
//       //   //id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
//       // }]);
//     });

//     // Listen for read receipts
//     // channel.listen('.MessageRead', (data) => {
//     //   setMessages(prev =>
//     //     prev.map(msg =>
//     //       msg.sender_id === data.userId && !msg.read_at
//     //         ? { ...msg, read_at: data.timestamp }
//     //         : msg
//     //     )
//     //   );
//     // });

//     // Connection debugging
//     echo.connector.pusher.connection.bind('connected', () => {
//       console.log('✅ Connected to private chat channel');
//     });

//     echo.connector.pusher.connection.bind('error', (error) => {
//       console.error('Pusher error:', error);
//     });

//     // Cleanup
//     return () => {
//       channel.stopListening('.NewMessage');
//       channel.stopListening('.MessageRead');
//       channel.stopListening('.NewMessageAfterMod');
//       echo.leave(`chat.${selectedChat.id}`);
//     };
//   }, [selectedChat]);

//   const markLastMessageAsRead = async (chatId) => {
//     try {
//         const response = await axiosClient.post(`/api/chats/${chatId}/messages/read`);
//         checkUnreadMessages();
//         // console.log('readSent',response.data.message);
//     } catch (error) {
//         console.error('Error marking last message as read:', error);
//     }
// };
//   useEffect(() => {
//     const echo = getEcho();
//     echo.connector.pusher.connection.bind('connected', () => {
//         // console.log('✅ WebSocket CONNECTED');
//     });
//     echo.connector.pusher.connection.bind('failed', () => {
//         // console.log('❌ WebSocket FAILED');
//     });
//     echo.connector.pusher.connection.bind('error', (err) => {
//         console.error('WebSocket ERROR:', err);
//     });
//     //const channel = echo.channel('chat');
//     const channel = echo.private(`App.Models.User.${user.id}`);
//     // Proper event listening with dot prefix
//     channel.listen('.NewMessage', (data) => {

//       //Because chat list is reset when user sends msg, there's no need to reset chat list again when we receive broadcat of our own message.
//         if((data.sender_id === user.id) == false){
//           fetchChats();
//         }

//         //(prev => [...prev, data.message]);
//     });

//     channel.listen('.NewMessageAfterMod', (data) => {

//           fetchChats();

//     });

//     // Connection debugging
//     echo.connector.pusher.connection.bind('connected', () => {
//         // console.log('Connected to WebSocket!');
//     });

//     return () => {
//         channel.stopListening('.NewMessage');
//         channel.stopListening('.NewMessageAfterMod');
//         echo.leave(`App.Models.User.${user.id}`);
//     };
// }, []);

//   // Initialize
//   useEffect(() => {
//     fetchChats();
//     checkUnreadMessages();

//     return () => {
//       if (pollingInterval) {
//         clearInterval(pollingInterval);
//       }
//     };
//   }, [activeTab]);

//   // Auto-scroll when messages change
//   useEffect(() => {
//     scrollToBottom();
//     messagesRef.current = messages;
//     // console.log(messagesRef.current)
//   }, [messages]);

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col md:flex-row md:h-screen">
//         {/* Sidebar */}
//         <div className="md:w-1/4 md:border-r overflow-y-auto">
//           <div className="flex justify-center gap-x-[20px] items-center p-2 pt-[17px] pb-[13px] border-b">
//             <button
//               className={`px-4 py-2 ${activeTab === "all" ? "bg-[#E91E63] text-white px-[20px] min-w-[133px] text-[16px] font-bold" : "bg-[#F5F5F5] min-w-[133px] text-[16px] font-bold"}`}
//               onClick={() => setActiveTab("all")}
//             >
//               ALL
//             </button>
//             <button
//               className={`px-4 py-2 ${activeTab === "archived" ? "bg-[#E91E63] text-white px-[20px] min-w-[133px] text-[16px] font-bold" : "bg-[#F5F5F5] min-w-[133px] text-[16px] font-bold"}`}
//               onClick={() => setActiveTab("archived")}
//             >
//               ARCHIVED
//             </button>
//           </div>

//           {/* User List */}
//           <div className="space-y-2">
//             {loading ? (
//               <div className="p-4 text-center">Loading chats...</div>
//             ) : chats.length === 0 ? (
//               <div className="p-4 text-center">No chats found</div>
//             ) : (
//               chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   className={`flex items-center space-x-2 p-2 py-[7px] border-b mb-[0px] cursor-pointer ${selectedChat?.id === chat.id ? 'bg-[#F8BBD0]' : ''}`}
//                   onClick={() => handleSelectChat(chat)}
//                 >
//                   <div className="w-8 h-8 bg-[#F5F5F5] rounded-full">
//                   <img className={`w-full h-full object-cover rounded-full`} src={getAttachmentURL(chat.other_user.profile_picture_id)}></img>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-[16px] font-bold truncate">{chat.other_user.name}</p>
//                     <p className="text-[14px] flex items-center gap-x-[5px] truncate">
//                       {/* <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <ellipse cx="8.66894" cy="7" rx="7.78808" ry="7" fill="#F9D132" fillOpacity="0.666667"/>
//                       </svg> */}
//                       <span className="truncate">
//                         {/* {chat.last_message ? `${(chat.last_message.sender_id == chat.other_user.id) ? '':'You: '}${chat.last_message?.message}` : 'No messages yet'} */}
//                         {chat.last_message ? (
//                           <>
//                             {chat.last_message.sender_id !== chat.other_user.id && (
//                               <strong>You: </strong>
//                             )}
//                             {chat.last_message?.message}
//                           </>
//                         ) : 'No messages yet'}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Chat Section */}
//         <div className="md:w-3/4 flex flex-col">
//           {selectedChat ? (
//             <>
//               {/* Header */}
//               <div className="flex justify-between p-[40px] pt-[34px] pb-[34px] border-b items-center">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-[#F5F5F5] rounded-full">
//                   <img className={`w-full h-full object-cover rounded-full`} src={getAttachmentURL(selectedChat.other_user.profile_picture_id)}></img>
//                   </div>
//                   <div>
//                     <p className="text-[20px] font-bold">{selectedChat.other_user.name}</p>
//                     <p className="text-[14px]">
//                       {selectedChat.other_user.dob ? `${getAge(selectedChat.other_user.dob)} years old` : ''} |
//                       {selectedChat.other_user.province_id ? ` ${getProvinceName(selectedChat.other_user.province_id)}` : '<cityname>'}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2 items-center">

//                   {/* <button className="px-4 py-1 h-[32px] bg-[#F5F5F5]">Profile</button> */}
//                   <Link to={`/user-profile/${selectedChat.other_user.name}`} className="px-4 py-1 h-[32px] bg-[#F5F5F5]">Profile</Link>
//                   <button
//                     className="px-4 py-1 h-[32px] bg-[#F5F5F5] flex items-center"
//                     onClick={() => toggleArchive(selectedChat.id, !selectedChat.is_archived)}
//                   >
//                     <FaArchive className="mr-2" />
//                     {selectedChat.is_archived ? 'Unarchive' : 'Archive'}
//                   </button>
//                   <div >
//                     <ReportChatButton chatId={selectedChat.id}/>
//                   </div>
//                 </div>

//               </div>

//               {/* Messages */}
//               <div ref={messagesContainerRef} className="flex-1 p-[40px] space-y-4 overflow-auto">
//                 {messages.length === 0 ? (
//                   <div className="text-center py-8">No messages yet. Start the conversation!</div>
//                 ) : (
//                   messages.map((msg, index) => (
//                     <div key={index} className={`flex ${(msg.sent === user.id) ? "justify-end" : "justify-start"}`}>
//                       <div className={`${(msg.sent === user.id) ? "chat-bubble-right" : "chat-bubble-left"}`}>
//                         <div className={`${(msg.sent === user.id) ? "chat-bubble-right-inner bg-[#E91E63] p-[15px] rounded-[20px]" : "chat-bubble-left-inner"}`}>
//                           <div className={`p-[15px] md:ps-[60px] max-w-xs ${(msg.sent === user.id) ? "bg-[#ffffff] text-[#424242] rounded-0 chat-box-gr" : "bg-[#E91E63] text-white rounded-[20px]"} text-center z-40 relative`}>
//                             {msg.text}
//                           </div>
//                         </div>
//                         <span className={`${(msg.sent === user.id) ? "mr-auto text-custom" : "ml-[60px]"}`}>
//                           {/* {msg.time} */}
//                           <RelativeTime timestamp={msg.time}/>
//                         </span>
//                       </div>
//                     </div>
//                   ))
//                 )}
//                 <div ref={messagesEndRef} />
//                 <div className={`flex justify-end`}>
//                 {(isRead == 2) ? "": (isRead ? "✓ Read":"")}
//                 </div>

//               </div>

//               {/* Input Box */}
//               <div className="p-4 mb-[20px] flex items-center">
//               {selectedChat.unlocked ? <>
//                 {!isTimeout ? (
//                 <form className="flex items-center w-full" onSubmit={sendMessage}>
//                 <input
//                   type="text"
//                   placeholder="Type here..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   //onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                   className="flex-1 p-2 px-[25px] bg-[#F5F5F5] focus:outline-0"
//                 />
//                 <button
//                   // onClick={sendMessage}
//                   className="ml-[20px] bg-[#E91E63] text-[#FFFFFF] p-2 px-[10px]"
//                   disabled={!newMessage.trim()}
//                 >
//                   <FaPaperPlane />
//                 </button>
//                 </form>
//                 ) :
//                 <div className="flex-1 p-2 px-[25px] bg-[#F5F5F5] focus:outline-0">Cannot send message for 60 seconds</div>
//                 }
//                 </>
//               :<>
//               {user.role == ROLES.KING ?
//                 <div className="flex-1">
//                   <button onClick={
//                     ()=>createChat(selectedChat.other_user.id,navigate,refreshUser, user.role, selectedChat.other_user.name)}
//                     className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] p-[12px]  hover:bg-[#F8BBD0] text-[#FFFFFF]">
//                     {/* UNLOCK CHAT */}
//                     {`UNLOCK CHAT FOR ${getUserCost(selectedChat.other_user.top_profile,selectedChat.other_user.verified_profile,profileCosts)} CREDITS`}
//                   </button>
//                 </div>
//               :
//                 <div className="flex-1 p-2 px-[25px] bg-[#F5F5F5] focus:outline-0">Cannot send message until other user unlocks the chat</div>
//               }
//               </>
//               }
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center">
//               <div className="text-center">
//                 <FaComments className="mx-auto text-4xl text-[#BDBDBD] mb-4" />
//                 <p className="text-xl text-[#424242]">Select a chat to start messaging</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Chat;
import { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaComments,
  FaPaperPlane,
  FaArchive,
  FaPaperclip,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { getAge, getAttachmentURL} from "../functions/Common";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { ROLES } from "../../constants";
import { toast } from "react-toastify";
import { getEcho } from "../../echo";
import RelativeTime from "../functions/RelativeTime";
import ReportChatButton from "../components/ReportChatButton";
import { createChat } from "../functions/UnlockChat";

import { ScrollArea } from "@/components/ui/scroll-area";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [chats, setChats] = useState([]); //list of chats to show sidebar
  const [selectedChat, setSelectedChat] = useState(null); //duh
  const [selectedChatOnline, setSelectedChatOnline] = useState(""); //duh

  const [messages, setMessages] = useState([]); //list of msgs to show on dashboard
  const [newMessage, setNewMessage] = useState(""); //text field where you'll type new text
  const [loading, setLoading] = useState(true); //loading for chat sidebar
  const [pollingInterval, setPollingInterval] = useState(null); //???
  const messagesEndRef = useRef(null); //Controls scrolling
  const {
    user,
    refreshUser,
    getProvinceName,
    profileCosts,
    checkUnreadMessages,
  } = useStateContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isRead, setReadStatus] = useState(2);
  const messagesRef = useRef(messages);
  const messagesContainerRef = useRef(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleTimeout = () => {
    setIsTimeout(true);
    setTimeout(() => {
      setIsTimeout(false);
    }, 60000); // 60 seconds = 60000 ms
  };

  // Fetch chats based on active tab (either 'all' or 'archived')
  const fetchChats = async () => {
    try {
      const response = await axiosClient.get(`/api/chats?type=${activeTab}`);
      //console.log(response.data);
      setChats(response.data);

      if (selectedChat && selectedChat.id) {
        const matchedChat = response.data.find(chat => chat.id === selectedChat.id);
        // Do something with matchedChat if needed
        console.log('Matched chat:', matchedChat);
        setSelectedChatOnline(matchedChat.other_user.is_online);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching chats:", err);
      setLoading(false);
    }
  };

  // Fetch messages for selected chat
  const fetchMessages = async (chatId) => {
    try {
      const response = await axiosClient.get(`/api/chats/${chatId}/messages`);
      const messages = response.data;
      setMessages(messages);
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        // console.log(lastMessage);
        markLastMessageAsRead(chatId);
        if (lastMessage.sent === true) {
          // If message is not sent (assuming this means it's received)
          if (lastMessage.is_read === 1) {
            setReadStatus(1); // Message is read
          } else {
            setReadStatus(0); // Message is unread
          }
        }
      }

      scrollToBottom();
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Start polling for new messages
  const startPolling = (chatId) => {
    // Clear any existing polling
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    //console.log('pooler',chats);

    // Start new polling
    const interval = setInterval(async () => {
      // console.log('ref',messagesRef.current.length);
      // console.log(Math.max(...messagesRef.current.map(m => m.id)))
      const lastMessageId =
        messagesRef.current.length > 0
          ? Math.max(...messagesRef.current.map((m) => m.id))
          : 0;
      //console.log(chatId,lastMessageId,messages);
      try {
        const response = await axiosClient.get(
          `/api/chats/${chatId}/messages/poll?last_message_id=${lastMessageId}`
        );
        // console.log(response.data);
        if (response.data.length > 0) {
          setMessages((prev) => [...prev, ...response.data]);
          scrollToBottom();
        }
      } catch (err) {
        console.error("Error polling messages:", err);
      }
    }, 10000); // Poll every 8 seconds

    setPollingInterval(interval);
  };

  // Archive/unarchive chat
  const toggleArchive = async (chatId, archive) => {
    try {
      const endpoint = archive ? "archive" : "unarchive";
      await axiosClient.post(`/api/chats/${chatId}/${endpoint}`);
      fetchChats(); // Refresh chat list
      //Update archive status without fetchChats();
      if (selectedChat?.id === chatId) {
        setSelectedChat((prev) => ({ ...prev, is_archived: archive }));
      }
    } catch (err) {
      console.error("Error toggling archive:", err);
    }
  };

  // Send new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const response = await axiosClient.post(
        `/api/chats/${selectedChat.id}/messages`,
        {
          message: newMessage,
        }
      );
      //Message interrupted by moderation
      if (response.status == 202) {
        toast.warn(response.data.message, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setNewMessage("");
        scrollToBottom();
        handleTimeout();
        return;
      }
      //console.log(response.data);
      setMessages((prev) => [
        ...prev,
        {
          ...response.data,
          //sentter: true,
          //id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
        },
      ]);
      fetchChats();
      setReadStatus(0);
      //console.log('pooler',messages)
      setNewMessage("");
      scrollToBottom();
    } catch (err) {
      toast.error(
        "Error sending message, Your message must not be greater than 1000 characters.",
        {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
      setNewMessage("");
      console.error("Error sending message:", err);
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    //messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messagesContainerRef.current && messagesEndRef.current) {
      const container = messagesContainerRef.current;
      const scrollHeight = messagesEndRef.current.offsetTop;

      container.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Handle chat selection
  const handleSelectChat = (chat) => {
    //Passing chat object
    setReadStatus(2);

    setChats(prevChats => 
      prevChats.map(c => 
          c.id === chat.id ? {...c, unread_count: 0} : c
      )
  );

    setSelectedChat(chat);
    //setSelectedChat({...chat, unread_count: 0}); // Also update the unread_count in the selected chat

    setSelectedChatOnline(chat.other_user.is_online);
    setIsMobileSidebarOpen(false); // Close mobile sidebar when chat is selected
    // console.log('chatter',chat);
    fetchMessages(chat.id);
    // startPolling(chat.id);
  };

  useEffect(() => {
    if (!selectedChat) return;
    const echo = getEcho();
    // Subscribe to private channel
    const channel = echo.private(`chatter.${selectedChat.id}`);

    // Listen for new messages (with Laravel's dot notation)
    channel.listen(".NewMessage", (data) => {
      const payload = data.message;
      const sender_id = data.sender_id;
      // console.log('payload',data)
      // console.log(payload['sent'] === user.id)
      // payload['sent'] = payload['sent'] === user.id
      // if(payload['sent'] == false){
      if ((sender_id === user.id) == false) {
        setMessages((prev) => [...prev, payload]);
        setReadStatus(2);
        markLastMessageAsRead(selectedChat.id);
      }

      // console.log(data.message);
      // setMessages(prev => [...prev, {
      //   ...response.data,
      //   //sentter: true,
      //   //id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
      // }]);
    });
    channel.listen(".NewMessageAfterMod", (data) => {
      //fetchMessages(selectedChat.id);
      handleSelectChat(selectedChat);
    });

    // // Subscribe to private channel
    // const channel2 = echo.private(`chatter.${selectedChat.id}`);

    // Listen for new messages (with Laravel's dot notation)
    channel.listen(".MessageRead", (data) => {
      // console.log('resdbroadcast',data)
      const currentMsgs = messagesRef.current;
      const lastMessage = currentMsgs[currentMsgs.length - 1];
      // console.log('resdbroadcast',messages,messages[messages.length - 1]);
      if (data.messageId == lastMessage.id) {
        if (data.readerId != user.id) {
          setReadStatus(1);
        }
      }
      // setMessages(prev => [...prev, {
      //   ...response.data,
      //   //sentter: true,
      //   //id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
      // }]);
    });
    // Listen for read receipts
    // channel.listen('.MessageRead', (data) => {
    //   setMessages(prev =>
    //     prev.map(msg =>
    //       msg.sender_id === data.userId && !msg.read_at
    //         ? { ...msg, read_at: data.timestamp }
    //         : msg
    //     )
    //   );
    // });

    // Connection debugging
    echo.connector.pusher.connection.bind("connected", () => {
      console.log("✅ Connected to private chat channel");
    });

    echo.connector.pusher.connection.bind("error", (error) => {
      console.error("Pusher error:", error);
    });

    // Cleanup
    return () => {
      channel.stopListening(".NewMessage");
      channel.stopListening(".MessageRead");
      channel.stopListening(".NewMessageAfterMod");
      echo.leave(`chat.${selectedChat.id}`);
    };
  }, [selectedChat]);

  const markLastMessageAsRead = async (chatId) => {
    try {
      const response = await axiosClient.post(
        `/api/chats/${chatId}/messages/read`
      );
      checkUnreadMessages();
      // console.log('readSent',response.data.message);
    } catch (error) {
      console.error("Error marking last message as read:", error);
    }
  };

  useEffect(() => {
    const echo = getEcho();
    echo.connector.pusher.connection.bind("connected", () => {
      // console.log('✅ WebSocket CONNECTED');
    });
    echo.connector.pusher.connection.bind("failed", () => {
      // console.log('❌ WebSocket FAILED');
    });
    echo.connector.pusher.connection.bind("error", (err) => {
      console.error("WebSocket ERROR:", err);
    });
    //const channel = echo.channel('chat');
    const channel = echo.private(`App.Models.User.${user.id}`);
    // Proper event listening with dot prefix
    channel.listen(".NewMessage", (data) => {
      //Because chat list is reset when user sends msg, there's no need to reset chat list again when we receive broadcat of our own message.
      if ((data.sender_id === user.id) == false) {
        fetchChats();
      }
      //(prev => [...prev, data.message]);
    });
    channel.listen(".NewMessageAfterMod", (data) => {
      fetchChats();
    });
    // Connection debugging
    echo.connector.pusher.connection.bind("connected", () => {
      // console.log('Connected to WebSocket!');
    });
    return () => {
      channel.stopListening(".NewMessage");
      channel.stopListening(".NewMessageAfterMod");
      echo.leave(`App.Models.User.${user.id}`);
    };
  }, []);

  // Initialize
  useEffect(() => {
    fetchChats();
    checkUnreadMessages();

    // return () => {
    //   if (pollingInterval) {
    //     clearInterval(pollingInterval);
    //   }
    // };
    const intervalId = setInterval(fetchChats, 120000);
    return () => clearInterval(intervalId);

  }, [activeTab]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
    messagesRef.current = messages;
    // console.log(messagesRef.current)
  }, [messages]);

  // Filter chats based on search query
  const filteredChats = chats.filter(
    (chat) =>
      chat.other_user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.last_message?.message || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="flex h-screen md:w-[98%] md:w-[90%] mx-auto  md:my-10 relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 fixed md:relative z-50 md:z-auto
          w-full md:w-80 h-full md:h-auto
          border-r border-gray-200 bg-white flex flex-col
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="p-4 md:p-6 flex-shrink-0">
            {/* Mobile close button */}
            {selectedChat !== null && (
              <div className="flex items-center justify-between mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Your Chat
                </h1>
                <button
                  className="md:hidden p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            )}
            {/* Search */}
            {/* <div className="relative mb-4 md:mb-6">
              <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-gray-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div> */}
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
                  activeTab === "all"
                    ? "bg-[#8880FE] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={`flex-1 px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
                  activeTab === "archived"
                    ? "bg-[#8880FE] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("archived")}
              >
                Archived
              </button>
            </div>
          </div>
          {/* Chat List */}
          <ScrollArea className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Loading chats...
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No chats found
              </div>
            ) : (
              <div className="space-y-1 px-3">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedChat?.id === chat.id
                        ? "bg-[#8880FE] text-white shadow-lg"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectChat(chat)}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          getAttachmentURL(
                            chat.other_user.profile_picture_id
                          ) || "/placeholder.svg"
                        }
                        alt={chat.other_user.name}
                        className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover"
                      />
                      {/* Online indicator - you can add online status logic here */}
                      {(chat.other_user.is_online == 'online') && <div className="absolute bottom-0 right-0 w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={`font-semibold truncate text-sm md:text-base ${
                            selectedChat?.id === chat.id
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {chat.other_user.name}
                        </p>
                        <span
                          className={`text-xs md:text-sm ${
                            selectedChat?.id === chat.id
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {chat.last_message && (
                            <RelativeTime timestamp={chat?.last_message?.created_at || ''} short={true} />
                          )}
                        </span>
                      </div>
                      <p
                        className={`text-xs md:text-sm truncate flex justify-between ${
                          selectedChat?.id === chat.id
                            ? "text-white/80"
                            : "text-gray-600"
                        }`}
                      >
                        {chat.last_message ? (
                          <>
                            
                            <span>
                            {chat.last_message.sender_id !==
                              chat.other_user.id && (
                              <span className="font-medium">You: </span>
                            )}
                            {chat.last_message.message}
                            </span>
                            {selectedChat?.id !== chat.id && chat.unread_count > 0 && (
                              <div className="w-8 h-5 bg-[#8880FE] text-white font-bold text-[15px] rounded-full text-center">{chat.unread_count}</div>
                            )}
                          </>
                        ) : (
                          "No messages yet"
                        )}
                      </p>
                       {/* Unread indicator */}
                    
                    </div>
                   
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <ScrollArea className="flex-1 flex flex-col w-full md:w-auto">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-3 md:p-6 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Mobile menu button */}
                    <button
                      className="md:hidden p-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsMobileSidebarOpen(true)}
                    >
                      <FaBars className="text-lg" />
                    </button>

                    <img
                      src={
                        getAttachmentURL(
                          selectedChat.other_user.profile_picture_id
                        ) || "/placeholder.svg"
                      }
                      alt={selectedChat.other_user.name}
                      className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                        {selectedChat.other_user.name}
                      </h2>
                      <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600">
                        {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Online</span> */}
                        {(selectedChatOnline == "online") ? (
                          <>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Online</span>
                          </>
                        )
                        :
                        (
                          <>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span>Away</span>
                          </>
                        )
                      }
                        {selectedChat.other_user.dob && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">
                              {getAge(selectedChat.other_user.dob)} years old
                            </span>
                          </>
                        )}
                        {selectedChat.other_user.province_id && (
                          <>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">
                              {getProvinceName(
                                selectedChat.other_user.province_id
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-3">
                    <Link
                      to={`/user-profile/${selectedChat.other_user.name}`}
                      className="px-2 md:px-4 py-1 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm font-medium transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      className="px-2 md:px-4 py-1 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm font-medium flex items-center space-x-1 md:space-x-2 transition-colors"
                      onClick={() =>
                        toggleArchive(
                          selectedChat.id,
                          !selectedChat.is_archived
                        )
                      }
                    >
                      {/* <FaArchive className="text-xs md:text-sm" /> */}
                      <span className="hidden sm:inline">
                        {selectedChat.is_archived ? "Unarchive" : "Archive"}
                      </span>
                    </button>
                    {selectedChat.unlocked ? <ReportChatButton chatId={selectedChat.id} /> : <></>}
                  </div>
                </div>
                {/* Unlock status */}
                
                  <div className="mt-3 text-xs md:text-sm text-gray-600">
                  <span>{selectedChat.unlocked ? `You unlocked the chat. Access is active.` : "This chat is locked"}</span>
                  </div>
                
              </div>
              {/* Messages */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-gray-50"
              >
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaComments className="mx-auto text-3xl md:text-4xl mb-4 text-gray-300" />
                    <p className="text-sm md:text-base">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sent === user.id ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sent !== user.id && (
                        <img
                          src={
                            getAttachmentURL(
                              selectedChat.other_user.profile_picture_id
                            ) || "/placeholder.svg"
                          }
                          alt={selectedChat.other_user.name}
                          className="w-6 md:w-8 h-6 md:h-8 rounded-full object-cover mr-2 md:mr-3 mt-1 flex-shrink-0"
                        />
                      )}
                      <div className="flex flex-col max-w-[75%] sm:max-w-xs lg:max-w-md">
                        <div
                          className={`px-3 md:px-4 py-2 rounded-2xl text-sm md:text-base ${
                            msg.sent === user.id
                              ? "bg-[#8880FE] text-white rounded-br-md"
                              : "bg-[#F1F1F1] text-gray-900 rounded-bl-md shadow-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span
                          className={`text-xs text-gray-500 mt-1 ${
                            msg.sent === user.id
                              ? "text-right"
                              : "text-left ml-2"
                          }`}
                        >
                          <RelativeTime timestamp={msg.time} />
                        </span>
                      </div>
                      {msg.sent === user.id && (
                        <img
                          src={
                            getAttachmentURL(user.profile_picture_id) ||
                            "/placeholder.svg"
                          }
                          alt="You"
                          className="w-6 md:w-8 h-6 md:h-8 rounded-full object-cover ml-2 md:ml-3 mt-1 flex-shrink-0"
                        />
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
                {/* Read status */}
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">
                    {isRead === 2 ? "" : isRead ? "✓ Read" : "✓ Sent"}
                  </span>
                </div>
              </div>
              {/* Message Input */}
              <div className="border-t border-gray-200 p-3 md:p-6 bg-white">
                {selectedChat.unlocked ? (
                  <>
                    {!isTimeout ? (
                      <form
                        onSubmit={sendMessage}
                        className="flex justify-center items-center space-x-2  w-full border-t border-gray-300 pt-2"
                      >
                        {/* <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FaPaperclip className="text-base" />
                        </button> */}
                        <div className="relative md:w-[80%] w-full">
                          <input
                            type="text"
                            placeholder="Type a message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full px-4 py-4 bg-white border  border-[#0C103838] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                          >
                            <FaPaperPlane className=" text-[#615EF0] text-xl" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex-1 p-3 md:p-4 bg-gray-100 rounded-xl text-gray-600 text-center text-sm md:text-base">
                        Cannot send message for 60 seconds
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {user.role === ROLES.KING ? (
                      <div className="flex-1">
                        <button
                          onClick={() =>
                            createChat(
                              selectedChat.other_user.id,
                              navigate,
                              refreshUser,
                              user.role,
                              selectedChat.other_user.name
                            )
                          }
                          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-xl transition-colors uppercase text-sm md:text-lg"
                        >
                          {`UNLOCK CHAT FOR ${selectedChat.other_user.unlock_cost} CREDITS`}
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 p-3 md:p-4 bg-gray-100 rounded-xl text-gray-600 text-center text-sm md:text-base">
                        Cannot send message until other user unlocks the chat
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center px-4">
                {/* Mobile menu button when no chat selected */}
                <button
                  className="md:hidden mb-4 p-3 bg-[#8880FE] text-white rounded-xl hover:bg-violet-500 transition-colors"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <FaBars className="text-lg" />
                </button>
                <FaComments className="mx-auto text-4xl md:text-6xl text-gray-300 mb-4" />
                <p className="text-lg md:text-xl text-gray-500">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
