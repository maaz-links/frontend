import React, { useState } from 'react';
import axiosClient from '../../axios-client';

const ReportChatButton = ({ chatId }) => {
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
      await axiosClient.post('/api/report-chat', {
        reported_chat_id: chatId,
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
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
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

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#E91E63',
    color: 'white'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    //backgroundColor: '#F8BBD0',
    color: 'black'
  };

  return (
    <>
      <button 
        className="px-4 py-1 h-[32px] bg-[#F5F5F5] flex items-center"
        onClick={openModal}
        style={dangerButtonStyle}
      >
        Report Chat
      </button>

      {isOpen && (
        <div style={backdropStyle} onClick={closeModal}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Report Chat</h2>
            
            {success ? (
              <div style={{ color: 'green', margin: '10px 0' }}>
                Report submitted successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="reason">Reason for reporting*</label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={textareaStyle}
                    placeholder="Please explain why you're reporting this chat..."
                    required
                  />
                </div>

                {/* <div>
                  <label htmlFor="additionalInfo">Additional information (optional)</label>
                  <textarea
                    id="additionalInfo"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    style={textareaStyle}
                    placeholder="Any additional details that might help..."
                  />
                </div> */}

                {error && (
                  <div style={{ color: 'red', margin: '10px 0' }}>
                    {error}
                  </div>
                )}

                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={buttonStyle}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                  
                    type="submit"
                    style={primaryButtonStyle}
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

export default ReportChatButton;