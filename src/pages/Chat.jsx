import { useState, useEffect, useRef } from "react";
import { FaSearch, FaComments, FaPaperPlane, FaBars, FaArchive } from "react-icons/fa";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { getAge, getAttachmentURL, getUserCost } from "../functions/Common";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { ROLES } from "../../constants";
import { toast } from "react-toastify";
import { getEcho } from "../../echo";
//import { useEcho } from "../../echo";
import RelativeTime from "../functions/RelativeTime";
import ReportChatButton from "../components/ReportChatButton";

const Chat = () => {

 
  const [activeTab, setActiveTab] = useState("all");
  const [chats, setChats] = useState([]); //list of chats to show sidebar
  const [selectedChat, setSelectedChat] = useState(null); //duh
  const [messages, setMessages] = useState([]); //list of msgs to show on dashboard
  const [newMessage, setNewMessage] = useState(""); //text field where you'll type new text
  const [loading, setLoading] = useState(true); //loading for chat sidebar
  const [pollingInterval, setPollingInterval] = useState(null); //???
  const messagesEndRef = useRef(null); //Controls scrolling
  const {user,refreshUser,getProvinceName,profileCosts,checkUnreadMessages} = useStateContext();

  const [isRead, setReadStatus] = useState(2);

  const messagesRef = useRef(messages);
  const messagesContainerRef = useRef(null);

  // const [selectedId, setSelectedId] = useState('');
  // const location = useLocation();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const tab = params.get("r");
  //   if (tab) {
  //     setSelectedId(tab);
  //   }
  // }, [location]);

  

  // Fetch chats based on active tab (either 'all' or 'archived')
  const fetchChats = async () => {
    try {
      const response = await axiosClient.get(`/api/chats?type=${activeTab}`);
      setChats(response.data);
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
            setReadStatus(1);  // Message is read
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
      const lastMessageId = messagesRef.current.length > 0 ? Math.max(...messagesRef.current.map(m => m.id)) : 0;
      //console.log(chatId,lastMessageId,messages);
      try {
        const response = await axiosClient.get(`/api/chats/${chatId}/messages/poll?last_message_id=${lastMessageId}`);
        // console.log(response.data);
        if (response.data.length > 0) {
          setMessages(prev => [...prev, ...response.data]);
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
      const endpoint = archive ? 'archive' : 'unarchive';
      await axiosClient.post(`/api/chats/${chatId}/${endpoint}`);
      fetchChats(); // Refresh chat list

      //Update archive status without fetchChats();
      if (selectedChat?.id === chatId) {
        setSelectedChat(prev => ({ ...prev, is_archived: archive }));
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
      const response = await axiosClient.post(`/api/chats/${selectedChat.id}/messages`, {
        message: newMessage
      });
      
      setMessages(prev => [...prev, {
        ...response.data,
        //sentter: true,
        //id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
      }]);
      fetchChats();
      setReadStatus(0);
      //console.log('pooler',messages)
      setNewMessage("");
      scrollToBottom();
    } catch (err) {
      toast.error('Error sending message, Your message must not be greater than 1000 characters.',{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
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
        behavior: 'smooth'
      });
    }
  };

  // Handle chat selection
  const handleSelectChat = (chat) => { //Passing chat object
    setReadStatus(2);
    setSelectedChat(chat);
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
    channel.listen('.NewMessage', (data) => {
      const payload = data.message;
      const sender_id = data.sender_id
      // console.log('payload',data)
      // console.log(payload['sent'] === user.id)
      // payload['sent'] = payload['sent'] === user.id
      // if(payload['sent'] == false){
      if((sender_id === user.id) == false){
        setMessages(prev => [...prev, payload]);
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

    
    // // Subscribe to private channel
    // const channel2 = echo.private(`chatter.${selectedChat.id}`);
  
    // Listen for new messages (with Laravel's dot notation)
    channel.listen('.MessageRead', (data) => {
      
      // console.log('resdbroadcast',data)
      const currentMsgs = messagesRef.current
      const lastMessage = currentMsgs[currentMsgs.length - 1];
      // console.log('resdbroadcast',messages,messages[messages.length - 1]);
      if(data.messageId == lastMessage.id){
        if(data.readerId != user.id){
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
    echo.connector.pusher.connection.bind('connected', () => {
      console.log('✅ Connected to private chat channel');
    });
  
    echo.connector.pusher.connection.bind('error', (error) => {
      console.error('Pusher error:', error);
    });
  
    // Cleanup
    return () => {
      channel.stopListening('.NewMessage');
      channel.stopListening('.MessageRead');
      echo.leave(`chat.${selectedChat.id}`);
    };
  }, [selectedChat]);

  const markLastMessageAsRead = async (chatId) => {
    try {
        const response = await axiosClient.post(`/api/chats/${chatId}/messages/read`);
        checkUnreadMessages();
        // console.log('readSent',response.data.message);
    } catch (error) {
        console.error('Error marking last message as read:', error);
    }
};
  useEffect(() => {
    const echo = getEcho();
    echo.connector.pusher.connection.bind('connected', () => {
        // console.log('✅ WebSocket CONNECTED');
    });
    echo.connector.pusher.connection.bind('failed', () => {
        // console.log('❌ WebSocket FAILED');
    });
    echo.connector.pusher.connection.bind('error', (err) => {
        console.error('WebSocket ERROR:', err);
    });
    //const channel = echo.channel('chat');
    const channel = echo.private(`App.Models.User.${user.id}`);
    // Proper event listening with dot prefix
    channel.listen('.NewMessage', (data) => {
        
      //Because chat list is reset when user sends msg, there's no need to reset chat list again when we receive broadcat of our own message.
        if((data.sender_id === user.id) == false){
          fetchChats();
        }

        //(prev => [...prev, data.message]);
    });

    // Connection debugging
    echo.connector.pusher.connection.bind('connected', () => {
        // console.log('Connected to WebSocket!');
    });

    return () => {
        channel.stopListening('.NewMessage');
        echo.leave(`App.Models.User.${user.id}`);
    };
}, []);

  // Initialize
  useEffect(() => {
    fetchChats();
    checkUnreadMessages();
    
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [activeTab]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
    messagesRef.current = messages;
    // console.log(messagesRef.current)
  }, [messages]);

  const createChat = async (other_user_id) => {
    try{
      const response = await axiosClient.post('/api/chats/credits',{other_user_id: other_user_id });
      // console.log('buychat',response);
      toast.success(response.data.message,{
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              })
      //alert(response.data.message);
      refreshUser();
      //window.location.reload('/chat');
      //navigate('/chat');
    } catch (error) {
      //alert(error.response.data.message);
      toast.error(error.response.data.message,{
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              })
      if(error.response.data.shop_redirect){
        navigate('/shop');
      }
      console.error('Error', error);
    }

    
    }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row md:h-screen">
        {/* Sidebar */}
        <div className="md:w-1/4 md:border-r overflow-y-auto">
          <div className="flex justify-center gap-x-[20px] items-center p-2 pt-[17px] pb-[13px] border-b">
            <button 
              className={`px-4 py-2 ${activeTab === "all" ? "bg-[#E91E63] text-white px-[20px] min-w-[133px] text-[16px] font-bold" : "bg-[#F5F5F5] min-w-[133px] text-[16px] font-bold"}`} 
              onClick={() => setActiveTab("all")}
            >
              ALL
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === "archived" ? "bg-[#E91E63] text-white px-[20px] min-w-[133px] text-[16px] font-bold" : "bg-[#F5F5F5] min-w-[133px] text-[16px] font-bold"}`} 
              onClick={() => setActiveTab("archived")}
            >
              ARCHIVED
            </button>
          </div>
          
          {/* User List */}
          <div className="space-y-2">
            {loading ? (
              <div className="p-4 text-center">Loading chats...</div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center">No chats found</div>
            ) : (
              chats.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`flex items-center space-x-2 p-2 py-[7px] border-b mb-[0px] cursor-pointer ${selectedChat?.id === chat.id ? 'bg-[#F8BBD0]' : ''}`}
                  onClick={() => handleSelectChat(chat)}
                >
                  <div className="w-8 h-8 bg-[#F5F5F5] rounded-full">
                  <img className={`w-full h-full object-cover rounded-full`} src={getAttachmentURL(chat.other_user.profile_picture_id)}></img>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-bold truncate">{chat.other_user.name}</p>
                    <p className="text-[14px] flex items-center gap-x-[5px] truncate">
                      {/* <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="8.66894" cy="7" rx="7.78808" ry="7" fill="#F9D132" fillOpacity="0.666667"/>
                      </svg> */}
                      <span className="truncate">
                        {/* {chat.last_message ? `${(chat.last_message.sender_id == chat.other_user.id) ? '':'You: '}${chat.last_message?.message}` : 'No messages yet'} */}
                        {chat.last_message ? (
                          <>
                            {chat.last_message.sender_id !== chat.other_user.id && (
                              <strong>You: </strong>
                            )}
                            {chat.last_message?.message}
                          </>
                        ) : 'No messages yet'}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div className="md:w-3/4 flex flex-col">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="flex justify-between p-[40px] pt-[34px] pb-[34px] border-b items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#F5F5F5] rounded-full">
                  <img className={`w-full h-full object-cover rounded-full`} src={getAttachmentURL(selectedChat.other_user.profile_picture_id)}></img>
                  </div>
                  <div>
                    <p className="text-[20px] font-bold">{selectedChat.other_user.name}</p>
                    <p className="text-[14px]">
                      {selectedChat.other_user.dob ? `${getAge(selectedChat.other_user.dob)} years old` : ''} | 
                      {selectedChat.other_user.province_id ? ` ${getProvinceName(selectedChat.other_user.province_id)}` : '<cityname>'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 items-center">
                
                  {/* <button className="px-4 py-1 h-[32px] bg-[#F5F5F5]">Profile</button> */}
                  <Link to={`/user-profile/${selectedChat.other_user.name}`} className="px-4 py-1 h-[32px] bg-[#F5F5F5]">Profile</Link>
                  <button 
                    className="px-4 py-1 h-[32px] bg-[#F5F5F5] flex items-center"
                    onClick={() => toggleArchive(selectedChat.id, !selectedChat.is_archived)}
                  >
                    <FaArchive className="mr-2" />
                    {selectedChat.is_archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <div >
                    <ReportChatButton chatId={selectedChat.id}/>
                  </div>
                </div>
                
              </div>

              {/* Messages */}
              <div ref={messagesContainerRef} className="flex-1 p-[40px] space-y-4 overflow-auto">
                {messages.length === 0 ? (
                  <div className="text-center py-8">No messages yet. Start the conversation!</div>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
                      <div className={`${msg.sent ? "chat-bubble-right" : "chat-bubble-left"}`}>
                        <div className={`${msg.sent ? "chat-bubble-right-inner bg-[#E91E63] p-[15px] rounded-[20px]" : "chat-bubble-left-inner"}`}>
                          <div className={`p-[15px] md:ps-[60px] max-w-xs ${msg.sent ? "bg-[#ffffff] text-[#424242] rounded-0 chat-box-gr" : "bg-[#E91E63] text-white rounded-[20px]"} text-center z-40 relative`}>
                            {msg.text}
                          </div>
                        </div>
                        <span className={`${msg.sent ? "mr-auto text-custom" : "ml-[60px]"}`}>
                          {/* {msg.time} */}
                          <RelativeTime timestamp={msg.time}/>
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
                <div className={`flex justify-end`}>
                {(isRead == 2) ? "": (isRead ? "✓ Read":"")}
                </div>
                
              </div>

              {/* Input Box */}
              <div className="p-4 mb-[20px] flex items-center">
              {selectedChat.unlocked ? <>
                <form className="flex items-center w-full" onSubmit={sendMessage}>
                <input 
                  type="text" 
                  placeholder="Type here..." 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)}
                  //onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 p-2 px-[25px] bg-[#F5F5F5] focus:outline-0" 
                />
                <button 
                  // onClick={sendMessage} 
                  className="ml-[20px] bg-[#E91E63] text-[#FFFFFF] p-2 px-[10px]"
                  disabled={!newMessage.trim()}
                >
                  <FaPaperPlane />
                </button>
                </form>
                </>
              :<>
              {user.role == ROLES.KING ?
                <div className="flex-1">
                  <button onClick={()=>createChat(selectedChat.other_user.id)} className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] p-[12px]  hover:bg-[#F8BBD0] text-[#FFFFFF]">
                    {/* UNLOCK CHAT */}
                    {`UNLOCK CHAT FOR ${getUserCost(selectedChat.other_user.top_profile,selectedChat.other_user.verified_profile,profileCosts)} CREDITS`}
                  </button>
                </div>
              :
                <div className="flex-1 p-2 px-[25px] bg-[#F5F5F5] focus:outline-0">Cannot send message until other user unlocks the chat</div>
              }
              </>  
              }
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FaComments className="mx-auto text-4xl text-[#BDBDBD] mb-4" />
                <p className="text-xl text-[#424242]">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;