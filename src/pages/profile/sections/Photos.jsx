import React, { useState, useEffect, useMemo } from "react";
import { XIcon, PlusIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";
import axiosClient from "../../../../axios-client";
import { useStateContext } from "@/context/ContextProvider";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getAttachmentURL } from "@/functions/Common";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshUser } = useStateContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [startSlideIndex, setStartSlideIndex] = useState(0);
  // Define slides using useMemo to compute only when givenUser changes
  const slides = useMemo(() => {
    
    return [
      ...((photos || []).map((p) => ({
        src: p.url,
      }))),
    ];
  }, [photos]);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/api/attachments');
      const fetchedImages = response.data.map(img => ({
        id: img.id,
        url: getAttachmentURL(img.id),
      }));
      setPhotos(fetchedImages);
    } catch (error) {
      toast.error("Error fetching images", {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images[]', file);
    });

    try {
      setIsLoading(true);
      await axiosClient.post('/api/attachments', formData);
      fetchImages();
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error("Error Uploading Image. Try Uploading image of smaller size.", {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      console.error('Error uploading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSelect = async (imageId) => {
    try {
      await axiosClient.post(`/api/attachments/${imageId}/set-profile-picture`, {});
      toast.success("Profile Picture Updated", {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      if (location.pathname == '/addphoto-signup') {
        navigate('/profile');
      }
      refreshUser();
    } catch (error) {
      toast.error("Error Setting Profile Picture", {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error('Error setting profile picture:', error);
    }
  };

  const removePhoto = async (imageId) => {
    if (user.profile_picture_id == imageId) {
      toast.error("Cannot Delete Profile Picture", {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    try {
      await axiosClient.delete(`/api/attachments/${imageId}`);
      fetchImages();
    } catch (error) {
      toast.error("Error deleting image.", {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error('Error deleting image:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-10 w-full flex justify-center items-center h-64">
        <ClipLoader color="#E91E63" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-10 w-full">
      <h2 className="text-[20px] leading-[24px] font-bold mb-8">My Photos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:w-[90%] gap-4">
        {photos.map((photo,i) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.url}
              alt={`Photo ${photo.id}`}
              className="w-full h-[30vw] lg:h-[15vw] object-cover rounded-2xl"
              onClick={() => {
                setStartSlideIndex(i);
                setIsLightboxOpen(true);
                console.log(slides);
              }}
            />
            <button
              onClick={() => removePhoto(photo.id)}
              className="absolute top-2 right-2  text-white/50 shadow rounded-full w-6 h-6 flex items-center justify-center  "
            >
              <XIcon />
            </button>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-white/50 w-[50%] p-1 rounded">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="profilePic"
                  checked={user.profile_picture_id === photo.id}
                  onChange={() => handleProfileSelect(photo.id)}
                  className="mr-2"
                />
                <span className="text-xs">Profile Picture</span>
              </div>
              {/* <button
                onClick={() => removePhoto(photo.id)}
                className="text-[#E91E63] p-1"
              >
                <FaTrash className="text-sm" />
              </button> */}
            </div>
          </div>
        ))}
        <label className="flex items-center justify-center w-full h-[30vw] lg:h-[15vw] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <PlusIcon className="text-gray-300" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isLoading}
          />
        </label>
      </div>
      <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            slides={slides}
            startSlideIndex={startSlideIndex}
            index={startSlideIndex}
          />
    </div>
  );
}