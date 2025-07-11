import React from "react";
import { XIcon, PlusIcon } from "lucide-react";

export default function PhotoGallery() {
  const [photos, setPhotos] = React.useState([
    "src/assets/images/welcome-image-desktop.jpg",
    "src/assets/images/for-hostess-hero-desktop.png",
    "src/assets/images/welcome-image-desktop.jpg",
    "src/assets/images/welcome-image-desktop.jpg",
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos([...photos, reader.result]);
        console.log("PHOTO :", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 md:p-10  w-full ">
      <h2 className="text-[20px] leading-[24px] font-bold mb-8">My Photos</h2>
      <div className="grid grid-cols-2  lg:grid-cols-3 xl-grid-col-4 xl:w-[90%] gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo}
              alt={`Photo ${index}`}
              className="w-full h-36 md:h-48 object-cover  rounded-2xl"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2  text-white/50 shadow rounded-full w-6 h-6 flex items-center justify-center  "
            >
              <XIcon />
            </button>
          </div>
        ))}
        <label className="flex items-center justify-center w-full h-36 md:h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <PlusIcon className="text-gray-300 " />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
