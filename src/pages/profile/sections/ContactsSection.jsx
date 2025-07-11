export default function ContactsSection({ contacts }) {
  if (contacts.length === 0) {
    return (
      <div className="w-full bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-10 space-y-6 h-[135px]">
        <h3 className="text-xl font-bold text-[#090909] tracking-[-0.04em]">Contacts</h3>
        <p className="text-base font-bold text-[#090909]/70 tracking-[-0.02em] leading-[23px]">
          You don`t have any contacts. <span className="underline cursor-pointer">Search now</span>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-10 space-y-6">
      <h3 className="text-xl font-bold text-[#090909] tracking-[-0.04em]">Contacts</h3>

      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={contact.avatar || "/placeholder.svg"}
                  alt={contact.name}
                  className={`${contact.isYou ? "w-6 h-6" : "w-[34px] h-[34px]"} rounded-full object-cover bg-gray-300`}
                />
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold text-[#090909] tracking-[-0.03em]">{contact.name}</p>
                <p className="text-xs font-bold text-[#5F5F5F] leading-[18px]">{contact.status}</p>
              </div>

              <button
                className={`${
                  contact.isYou
                    ? "bg-[#8880FE] text-white px-2 py-1 text-[8px] rounded-lg"
                    : "bg-[#090909]/4 text-[#090909] px-6 py-3 text-base rounded-xl"
                } font-bold tracking-[-0.03em]`}
              >
                {contact.isYou ? "You" : "Chat"}
              </button>
            </div>

            {index < contacts.length - 1 && <div className="w-full h-px bg-[#D8D8D8] mt-4"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
