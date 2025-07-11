export default function ContactsSection({ contacts }) {
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
                    src="data:image/jpeg;base64,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"
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
