import { useEffect } from "react";
import desktopImage from '/src/assets/images/welcome-image-desktop.jpg';

function PopUpModel({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative z-50  mx-4 bg-white rounded-2xl shadow-xl p-12 text-center justify-center"
        style={{
          // backgroundImage: `url(${desktopImage})`,
          // backgroundSize: 'cover',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default PopUpModel;
