import { toast } from "react-toastify";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";

const UnlockChatModal = ({
  isOpen,
  onClose,
  userName,
  coinCost,
  userBalance,
  userId,
}) => {
  if (!isOpen) return null;
  const canAfford = userBalance >= coinCost;

  const {refreshUser} = useStateContext();
  const navigate = useNavigate();
  async function onConfirm() {
    try {
      const response = await axiosClient.post("/api/chats/credits", {
        other_user_id: userId,
      });
      // console.log('buychat',response);
      //alert(response.data.message);
      toast.success(response.data.message, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      refreshUser();
      navigate("/chat");
    } catch (error) {
      console.log(error);
      //alert(error.response.data.message);
      toast.error(error.response.data.message, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      if (error.response.data.shop_redirect) {
        navigate("/shop");
      }
      console.error("Error", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50  backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative rounded-3xl p-12 max-w-3xl w-full mx-4 shadow-2xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/images/gradient-bg.png')",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-start justify-between">
          {/* Content */}
          <div className="flex-1 pr-6">
            <h2 className="text-3xl font-bold text-black mb-6">
              Unlock Chat with {userName}
            </h2>

            <p className="text-black text-opacity-90 mb-3 text-lg">
              To start a chat with {userName}, you need to debit{" "}
              <span className="font-semibold">{coinCost} coins</span> from your
              balance.
            </p>

            <p className="text-black text-opacity-90 mb-8 text-lg">
              Your balance:{" "}
              <span className="font-semibold">{userBalance} coins</span>
            </p>

            {canAfford ? <button
              onClick={onConfirm}
              className={`w-1/2 py-4 px-8 rounded-2xl font-semibold text-lg transition-all ${
                  "bg-black text-white hover:bg-gray-800 active:scale-95"
              }`}
            >
              Confirm
            </button>
            :
            <button
              onClick={() => navigate('/shop')}
              className={`w-1/2 py-4 px-8 rounded-2xl font-semibold text-lg transition-all ${
                  "bg-black text-white hover:bg-gray-800 active:scale-95"
              }`}
            >
              Top Up my Balance
            </button>
            }
          </div>

          {/* Lock and Key Image */}
          <div className="  w-[40%] ">
            <div className=" flex items-center   justify-center">
              <img
                src={canAfford ? "/src/assets/images/lock-key.png" : null}
                alt="Lock and Key"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockChatModal;
