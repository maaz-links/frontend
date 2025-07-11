import { MoreVertical, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
export default function ProfileCard({
  profileData,
  isComplete,
  progressValue = 75,
}) {
  // Calculate the stroke-dasharray and stroke-dashoffset for the progress ring
  const radius = 75; // Radius of the progress circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressValue / 100) * circumference;

  const menuItems = [
    {
      id: "edit",
      label: "Edit Information",
      onClick: () => console.log("Edit Information"),
    },
    {
      id: "delete",
      label: "Delete Profile",
      onClick: () => console.log("Delete Profile"),
      variant: "danger",
    },
  ];

  return (
    <div className=" lg:w-[387px] bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] py-6 lg:p-6">
      {/* More Button */}

      <div className="flex justify-end mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-6 h-6 text-[#090909]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={"border-0 rounded-2xl p-2  font-bold leading-[100%] "}
          >
            <DropdownMenuItem>Edit Information</DropdownMenuItem>
            <DropdownMenuItem className={"text-red-600 text-[14px]"}>
              Delete Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          {isComplete ? (
            <>
              {/* Progress Ring */}
              <div className="absolute -inset-3">
                <svg
                  className="w-[162px] h-[162px] transform -rotate-90"
                  viewBox="0 0 162 162"
                >
                  {/* Background circle */}
                  <circle
                    cx="81"
                    cy="81"
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth="6"
                    fill="transparent"
                    className="opacity-30"
                  />
                  {/* Progress circle */}
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
              <div className="relative w-[140px] h-[140px] bg-white rounded-full overflow-hidden">
                <div className="absolute inset-[16px] bg-white rounded-full overflow-hidden">
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIGAwQHBQj/xAA5EAABAwMCBAQCCQMEAwAAAAABAAIDBAUREiEGMUFREyJhcQeBFCMyUpGhscHRQmLwFXKC4SQzQ//EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHREBAQACAwEBAQAAAAAAAAAAAAECERIhMQNBE//aAAwDAQACEQMRAD8A6GmMpjdSAXNpEZ7KQTQikjJTTwhpHJTHJNCKEiSmkgW6aAmiIoKaEEDlCkhERUSplRIWlQ3Qp4QgYKmEk1kCMp4TRSz6JppKBKJdhSJwqvxVxZFZi6lpmfSK7GSzPljHd38ILFNURQt1Svawd3HCUdRFJHrZIwt7hwwvnu9324XWuJqKp7y44wD5R7DopAVVFM+k8WV/h4JjDzpz7ZRNvoZr2kZB27jknqwcFfPtn4qu1mrNVPO8M1eaCVxcw/Lp8l2PhLiem4ioy+IeFUxgeLCebT39R6ob29/UPVNIFMKgKRUkkESUlNJBFCaEDTCApAKKQUxyQAmgSgThTUXciO6Cu8aX/wD0O1OdDpNXNlkIdyaerj7c1xqGaatrfozDJPNMSXH7TnE9Sva+I93Nfe5/MPBpvqYuwxu53zO3yVp+GXDraG2MudUwGsqvOMjdjOg/BYyuptrDDlXjWL4e1DauOrqnsa1rgfDH77Ku8RWyvoKmodOw63PJL/vDuu+tjAi27Lyrjb6etYY6iNr2nnkZU5WOn85l1Hzu1kr3h0p1dDkqwWGsnslxgrqc5dH9poP22dQf87KycTcCSUcclZa4xLEBl8Q3LR6dwqi0gM2P2NwPTstSyuNxuNd+o6mKspYamAgxzMD2kdiMrYyqf8Na/wCk2N1MTl1M8gf7TuP3VvC1BLKEwEYVQkipJFBHKE8IQMEFZGhRCmFFCMhCEES4eq0b3WigtVVVE/8ArjJHqcbBb5VD+JdxeLY6nj2j1ZefvY/7ws26ajk9wc+skcN3GSRrB/cXH/tdlgvMltihhnt0vgtY0B0RDtI9QuYcLUArr3bqaQEgziR3y837BdIunBkVRrmo3TtmkcHGTxCT7DPIeyl7unT5zU2s0NeyaAPjJLD32wsElVEHHXIxvu5YrdROo6PwJZPFfpHmI6qmXO319d4sslO2RjC7SxzsF2DywsXd6dvO1+pqiGZpdFIx+OxBXHfiRSR0F+MtNF4UNQ3UQ3lq6kK2cK09XBVtE1rdSh7fLLDkt58j1XmfGGnBbQOGxBeDv7Ky9uX0m8dtX4S3J0d3dSvPknjc0D+5py38tQXXmlfOXCtUbVxFQy63aRMw79icH9Svoxm+4Gy6uE8ZAhATVRHI7pZBUihBFCChBkCeQkE8KKeR3QlhNRYw1L/DhdJ90LlXxGfpjbFuSXaNuw3J/ErqNyIFG4kjSCNRJxgZGVw3j67R199fFRya4YRoDhyLuZP6fgs2bq/jZ4DqMcU0xcCGhrmt98LsbKzyiFu6+fOHLk2g4lt73u+rbJpeenm2/hdze76PE6pgYJepBONvRZy3K7/HWWOm/HLG7S4SMOSeqwZikc9rmNw3Y56/5lVm81EE4BdBUwHHma2MlpH/ABULbVRx1Bjo5ZZC/BfrieAOnMjCzyd7hZ2ttMYWHDWhrRvsqB8VWGqoY3sG0TsueTgMH88laY5XMLjI8BoO++2FxririqqvVRV0sbmChdPlmBu5rdm/z81cZtx+tmM1XjRuImheM51Y/NfTdKSYIi7mWD9F86263yXOuoqWEbiN0jsdGtGSfyX0ZTD6iLP3B+i7PJGYEd1JRwE1QIKEuaAQkhBkCkFEAKSihLKaiQEair/EKKqdYJpoqoRU8DDJOxoy6QY2APTdcIqmyRM8Rx3eT757rvXxBhM3CdaGOLSNBcG9RqGy41doRNRUspaGBz5nEegcAPyWf1KrQbqOcZOV1b4a8WPq8Wi6u+t0/USu/rA6H1XN6QRsi1uGdXL0KzRF0NVTujcR5hjB/P8AzsmXcMLcbuO61VqpnvBiqJGjmWtOAtO4y01tpQTIyMDkSVX6apuBpRqqHuIGd91WOIaqZ7neM9zsdyuHr2ZfTpLi3jF9RTvoLYXNbIMSzciW9h791S4oiSAxpOPRbPguc8n+rmT6rctdK9zw0askrvNYx48rc8t1Zfh85jLrLDIzS+oibTxzO2DGlwL/AJkDZdsGNtPJcJoaaWGCaqpnufLGMzQ53DM5DgOo7rpfAfEEd1oPBMmZ4RhwJycdweykppbQUZSByELoyeQhLAQgEIQgyBNRCeB2UU8qDiphoJwETMDYg/7pGf0STZy08y8hs1BNThmpzx5R3I3H5r5+u8k2owysLZIsxEeziT+q7zxXco7JZai4PGXRs0xtxu97jho/NfP1RWSzVp8STU8nJLhsSplNU3trN/8AlHnDRlzz2W3QRvra9gDS1rRgDHIdFuU9tqKyvip4I/NMMnQMY75XWbBwRSQ08T6huZQAQR+6mrZ0s1L217bQPNDEHN82MZVU4utTxWwxRtOS0yHZdWZbHQnylpHQDZeJxNY6iqhbU0zPr4enVwXPhlPx6LljZ6409v0cljhyznuVt2+YwxxvIAcWgrYulOZTI+Py+GQ2TI5k5/j815Bkc+cNBwP0AW/Y4eV61qvkNLXyCqiHgyfYmY0l8ZAA2wRseoOVu2W401ruEFVFM5kkZLXBjS3xWaiB6Z0kfgvCjphLOGsAIzvqO46beivdr4SpnUtPUTmSWSR7A0MPlIJx+KlhFq4Y4hqLxU1BELRRsA8KUE+Y9W79fkrMCOmyLXbKShpI6WKFrYwOQGylNB4LvLktPfousmoxvdRQkg7oDKFHA7IQZkwVEBSAUVkjG+VNzQ5pb3Q0aQG9SMlY8aZBnkV0nUYvqt8bRU1TTmnrJXMiiidM4NIy48gN/c+y4Q+GJ1UfEila4uzqacj3XR+MbxPb+JKtt3p5pLY97TFLE3UAMbscP92/zVDuN4p6gTSUwkNS6dz/ABHbAM2AGFyy9bjZp66a23Glq2SO/wDHIzkc29j6LutnqWVVNHJGctc0EHPNfOrHy1TDK6MuYfK/A2GfVd04LjkbbIdR8jWADfkmJkskmoDK1K+cxUjixzWvcNLTnYE7Z/dbxaHDB5epVO4mrD/qlPb2BzmNYZJABzDtvzAI+a3ldRmTdVDiWhjEUstPE7w2s8UO66RsNXywfmqBSOc6pllOcaCB7nkP1XS+P699BZZoGgNqZ3hk7yNm7Ehg9cZJXNKd0khbHEAGhwJcRzK5N5PaY2N0by8luXZ1dh/CsfD9zq+HbpBb7i90lCHtew5yG5GA4e2cEKoU1W+aodG7SG5xsNiFZ5pWXTh+zQDDq18jm7c9AJaSfyRXZ6KVszfFafJny/ytp310Rz7heZb4jSW6mpjkSBoYc8/Ur0mAYA7LtPHK+tHlsjKlPHolIHI7hQWVNCjlNBlCyxN1O9liHJbEMeGg53KsWpv+0oPGd03t35pZ04C0wr12s4roXv0anNecsPJ7TzBVGqOCbTBcDK6juclDJ9qniGHQv/DzNPodv06zCPIT/cUFgcd1ni1yUqh4XttTAI3QS09E0gx0bfLkj+p56n5q00lJDSRiOFukY2W2I2tG2VE+qutG0XmTT5A07cnHH7KrQU+L3dLnLh9QJGQRM5DZudj/AMuatRIA5rlXFz7jNdJ5LbS1EzCMPAhcGD11ZAJWc2sXk/EO80dYYLVTku+iymWWZrs+K8jBx+PP5KqQyiKRzGxkNe3DSBy7brPNbqiIl08cTMgktbufnjkrlwpwwLpFHNM3w4wzfS3zO7D0XPurpT7LaKy6O+jUDPrTJjJ6Y7ro/wAPuFnUsjaythIewkRh39RBI29Bz9Vb7Pw5Q2hwfTtY12jT7d8e62KKbFB433GloA6nUVuYs7bTcyTOfzbD5fc9VtxnI9FqwQmGnZGT5zu/3K2YxgDqujNKsZmISfd5+y0l6gbrY5pGQV5TgQ4tPMHBWasNCjj1QoNhm7gtwdEIW4UnLG77QQhVlIbRsx2/dMIQgg9YHE5TQoqUbQRkrDc4YzCdUbXeXI1DOEkKVVQuVoo59LpI8kMJ5+yslkpYqeiYIm4BaE0LGPrV8b7mhzNRG4Xn2sB4jY77Ile7HqDshC2y9P8AqOe6zsCEKssjBvzK8+tAFQ/HohClWMCEIWVf/9k="
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="w-[150px] h-[150px] border-12 border-[#CCCCCC4D] rounded-full flex items-center justify-center relative">
              <div className="w-28 h-28 bg-[#F3F3F5] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="54"
                  viewBox="0 0 55 54"
                  fill="none"
                >
                  <g opacity="0.1">
                    <path
                      d="M33.4921 24.6019C38.0372 25.9307 42.0293 28.6966 44.8702 32.4852C47.711 36.2738 49.2476 40.881 49.2496 45.6163H5.44141C5.44236 40.8807 6.97852 36.273 9.81951 32.4842C12.6605 28.6954 16.6532 25.9297 21.1989 24.6019L27.3455 33.8218L33.4921 24.6019ZM38.2976 12.7602C38.2976 15.6648 37.1437 18.4505 35.0898 20.5044C33.0359 22.5583 30.2502 23.7122 27.3455 23.7122C24.4409 23.7122 21.6552 22.5583 19.6012 20.5044C17.5473 18.4505 16.3935 15.6648 16.3935 12.7602C16.3935 9.85549 17.5473 7.0698 19.6012 5.01589C21.6552 2.96198 24.4409 1.80811 27.3455 1.80811C30.2502 1.80811 33.0359 2.96198 35.0898 5.01589C37.1437 7.0698 38.2976 9.85549 38.2976 12.7602Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </div>
            </div>
          )}
          {/* Plus Button */}
          <button
            className={`absolute bottom-0 ${
              isComplete ? "-right-2" : "right-0"
            } w-10 h-10 bg-[#090909] border-[6px] border-white rounded-full flex items-center justify-center`}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-6 w-full">
          <h3 className="text-[24px] font-bold text-[#090909] tracking-[-0.04em] mt-2">
            {profileData.name}
          </h3>
          {isComplete && (
            <>
              <p className="text-base font-normal text-[#090909]/70 tracking-[-0.02em] leading-[23px]">
                {profileData.description}
              </p>
              <div className="w-full h-px bg-black/10"></div>
              {/* Interests */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Personality and interests:
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-[#F3F3F5] hover:text-white hover:bg-black cursor-pointer rounded-full px-3 py-2 text-sm font-bold text-[#090909]  tracking-[-0.03em]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full h-px bg-black/10"></div>
              <div className="w-full h-px bg-black/10"></div>
              {/* Informations */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Informations
                </p>
                <p className="text-sm font-normal text-[#090909]/40 tracking-[-0.02em] leading-[23px]">
                  No Informations
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <button className="mt-10 text-[16px] font-bold tracking-[-0.03em]  capitalize mb-5 text-[#090909] mx-auto w-[90%] hover:text-white hover:bg-black  lg:w-[301px] h-[60px] bg-[#090909]/4 rounded-xl flex items-center justify-center">
        {isComplete ? "add Informations" : "fill out my profile"}
      </button>
    </div>
  );
}
