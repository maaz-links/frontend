import { Plus } from "lucide-react";
import { useRef } from "react";

export const Avatar = ({
  radius = 75,
  progressValue = 0,
  hasProfilePicture = false,
  profilePictureUrl = '',
  showProgressRing = false,
  showUploadButton = false,
  onImageUpload = () => {},
  avatarSize = 'large', // or 'small', 'large'
  borderColor = '#CCCCCC4D',
  placeholderOpacity = 0.1,
  uploadButtonPosition = 'bottom-right', // or 'bottom-left', 'top-right', etc.
}) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressValue / 100) * circumference;
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  // Size classes based on avatarSize prop
  const sizeClasses = {
    small: {
      container: 'w-[100px] h-[100px]',
      inner: 'w-20 h-20',
      icon: 'w-8 h-8',
    },
    medium: {
      container: 'w-[150px] h-[150px]',
      inner: 'w-28 h-28',
      icon: 'w-[55px] h-[54px]',
    },
    large: {
      container: 'w-[200px] h-[200px]',
      inner: 'w-36 h-36',
      icon: 'w-[70px] h-[68px]',
    },
  };

  // Upload button position classes
  const buttonPositionClasses = {
    'bottom-right': 'bottom-0 -right-2',
    'bottom-left': 'bottom-0 -left-2',
    'top-right': 'top-0 -right-2',
    'top-left': 'top-0 -left-2',
  };

  return (
    <div className="relative">
      {hasProfilePicture ? (
        <>
          {showProgressRing && (
            <div className="absolute -inset-3">
              <svg
                className="w-[162px] h-[162px] transform -rotate-90"
                viewBox="0 0 162 162"
              >
                <circle
                  cx="81"
                  cy="81"
                  r={radius}
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="transparent"
                  className="opacity-30"
                />
                <circle
                  cx="81"
                  cy="81"
                  r={radius}
                  stroke="#8880FE"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-in-out"
                />
              </svg>
            </div>
          )}
          <div className="relative w-[140px] h-[140px] bg-white rounded-full overflow-hidden">
            <div className="absolute inset-[16px] bg-white rounded-full overflow-hidden">
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </>
      ) : (
        <div
          className={`${sizeClasses[avatarSize].container} border-12 border-[${borderColor}] rounded-full flex items-center justify-center relative`}
        >
          <div
            className={`${sizeClasses[avatarSize].inner} bg-[#F3F3F5] rounded-full flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={sizeClasses[avatarSize].icon.split(' ')[0]}
              height={sizeClasses[avatarSize].icon.split(' ')[1]}
              viewBox="0 0 55 54"
              fill="none"
            >
              <g opacity={placeholderOpacity}>
                <path
                  d="M33.4921 24.6019C38.0372 25.9307 42.0293 28.6966 44.8702 32.4852C47.711 36.2738 49.2476 40.881 49.2496 45.6163H5.44141C5.44236 40.8807 6.97852 36.273 9.81951 32.4842C12.6605 28.6954 16.6532 25.9297 21.1989 24.6019L27.3455 33.8218L33.4921 24.6019ZM38.2976 12.7602C38.2976 15.6648 37.1437 18.4505 35.0898 20.5044C33.0359 22.5583 30.2502 23.7122 27.3455 23.7122C24.4409 23.7122 21.6552 22.5583 19.6012 20.5044C17.5473 18.4505 16.3935 15.6648 16.3935 12.7602C16.3935 9.85549 17.5473 7.0698 19.6012 5.01589C21.6552 2.96198 24.4409 1.80811 27.3455 1.80811C30.2502 1.80811 33.0359 2.96198 35.0898 5.01589C37.1437 7.0698 38.2976 9.85549 38.2976 12.7602Z"
                  fill="black"
                />
              </g>
            </svg>
          </div>
        </div>
      )}

      {showUploadButton && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleClick}
            className={`absolute ${buttonPositionClasses[uploadButtonPosition]} w-10 h-10 bg-[#090909] border-[6px] border-white rounded-full flex items-center justify-center`}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </>
      )}
    </div>
  );
};
