import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { Link } from "react-router-dom";
import { getAttachmentURL } from "@/functions/Common";

export default function ContactsSection() {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const response = await axiosClient.get(`/api/chats?for_contact=true`);
      //console.log(response.data);
      setContacts(response.data);

      // if (selectedChat && selectedChat.id) {
      //   const matchedChat = response.data.find(chat => chat.id === selectedChat.id);
      //   // Do something with matchedChat if needed
      //   console.log('Matched chat:', matchedChat);
      // }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching chats:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchChats();
     
    }, []);

  if (contacts.length === 0) {
    return (
      <div className="w-full bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-10 space-y-6 h-[135px]">
        <h3 className="text-xl font-bold text-[#090909] tracking-[-0.04em]">Contacts</h3>
        <p className="text-base font-medium text-[#090909]/70 tracking-[-0.02em] leading-[23px]">
          You don`t have any contacts. <span className="underline font-bold cursor-pointer">Search now</span>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-2 py-6 lg:p-10 space-y-6">
      <h3 className="text-xl font-bold text-[#090909] tracking-[-0.04em]">Contacts</h3>

      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  // src={contact.avatar || "/placeholder.svg"}
                    src={getAttachmentURL(contact.other_user.profile_picture_id)}
                  alt={contact.other_user.name}
                  className={`${false ? "w-6 h-6" : "w-[44px] h-[44px]"} rounded-full object-cover bg-gray-300`}
                />
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold text-[#090909] tracking-[-0.03em]">{contact.other_user.name}</p>
                <p className="text-xs font-bold text-[#5F5F5F] leading-[18px]">
                <>
                    {(contact.other_user.is_online == "online") && false && <div className="inline-block mr-1 w-2 h-2 bg-green-500 rounded-full"></div>}
                </>
                  {(contact.other_user.is_online == "online") ? "Online" : "Away"}
                  </p>
              </div>

              <Link
                to="/chat"
                className={`${
                  false
                    ? "bg-[#8880FE] text-white px-2 py-1 text-[8px] rounded-lg"
                    : "bg-[#090909]/4 text-[#090909] px-6 py-3 text-base rounded-xl"
                } font-bold tracking-[-0.03em]`}
              >
                {false ? "You" : "Chat"}
              </Link>
            </div>

            {index < contacts.length - 1 && <div className="w-full h-px bg-[#D8D8D8] mt-4"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
