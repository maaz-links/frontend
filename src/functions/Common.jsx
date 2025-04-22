//const [errors, setErrors] = useState

export const ErrorText = ({ errors,field }) => {
    return (
      <>
        {errors[field]?.map((error, index) => (
          <p key={index} className="text-red-500 text-sm">
            {error}
          </p>
        ))}
      </>
    );
  };

export function dressSizeName(sizeAbbr) {
    const sizeMap = {
      'S': 'Small',
      'M': 'Medium',
      'L': 'Large'
    };

    return sizeMap[sizeAbbr] || 'Invalid size';
  }

export function getAttachmentURL($id){
  return `${import.meta.env.VITE_API_BASE_URL}/api/attachments/${$id}`
}

export function formatDateToDMY(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are 0-based
  const year = date.getUTCFullYear() % 100; // Last 2 digits

  return `${day}/${month}/${year}`;
}

// function formatDateToDMY(dateString) {
//   const date = new Date(dateString);
//   const day = String(date.getUTCDate()).padStart(2, '0');
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const year = String(date.getUTCFullYear()).slice(-2);

//   return `${day}-${month}-${year}`;
// }

export function formatToHourMinute(dateString) {
  const date = new Date(dateString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}
