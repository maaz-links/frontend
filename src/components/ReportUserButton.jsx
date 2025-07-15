import React, { useState } from 'react';
import axiosClient from '../../axios-client';

const ReportUserButton = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setError(null);
    setError(null);
    setSuccess(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setReason('');
    setAdditionalInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      setError('Please provide a reason for reporting');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axiosClient.post('/api/report-user', {
        reported_user_id: userId,
        reason: reason.trim(),
        //additional_info: additionalInfo.trim()
      });
      
      setSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal backdrop styles
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  // Modal content styles
  const modalStyle = {
    backgroundColor: 'white',
    padding: '20px 30px',
    borderRadius: '25px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  // Input styles
  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  // Textarea styles
  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  // Button styles
  const buttonStyle = {
    padding: '10px 15px',
    margin: '5px',
    //borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  };

  // const primaryButtonStyle = {
  //   ...buttonStyle,
  //   backgroundColor: '#E91E63',
  //   color: 'white'
  // };

  const dangerButtonStyle = {
    ...buttonStyle,
    //backgroundColor: '#F8BBD0',
    color: 'black'
  };


  return (
    <>
      {/* <button 
        className="px-2 py-1 h-[35px] bg-gray-100 hover:bg-gray-200 rounded-lg text-xs md:text-sm font-medium flex items-center space-x-1 md:space-x-2 transition-colors"
        onClick={openModal}
        //style={dangerButtonStyle}
      >
        Report User
      </button> */}
      <button
            onClick={openModal}
            className="flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-black text-[16px] font-medium hover:text-gray-800 mb-4 sm:mb-8 text-sm"
          >
            Report User
          </button>
          {isOpen && (
  <div style={backdropStyle} onClick={closeModal}>
    <div style={modalStyle} onClick={e => e.stopPropagation()} className="p-6">
      <h2 className='font-bold text-4xl text-center my-4'>Report User</h2>
      
      {success ? (
        <div className="text-green-500 my-2">
          Report submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reason" className="block mb-2">Reason for reporting*</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8880FE]"
              placeholder="Please explain why you're reporting this user..."
              required
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="additionalInfo" className="block mb-2">Additional information (optional)</label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8880FE]"
              placeholder="Any additional details that might help..."
            />
          </div> */}

          {error && (
            <div className="text-red-500 my-2">
              {error}
            </div>
          )}

          <div className="mt-5 text-right">
            <button
              type="button"
              onClick={closeModal}
              className='rounded-2xl px-4 py-2 m-3 bg-gray-100 hover:bg-gray-200 transition-colors'
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className='rounded-2xl bg-black text-white px-4 py-2 hover:bg-[#8880FE] transition-colors'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
)}
    </>
  );
};

export default ReportUserButton;