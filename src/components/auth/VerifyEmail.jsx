// src/pages/VerifyEmail.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../context/ContextProvider';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState(null);
  const { setUser, setToken } = useStateContext()
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(location.search);
        // console.log(location.search);
          const id = params.get('id');
          const expires = params.get('expires');
          const hash = params.get('hash');
          const signature = params.get('signature');

          if (!id || !expires || !hash || !signature) {
            throw new Error('Missing required verification parameters');
          }

          const backendLink = `${id}?expires=${expires}&hash=${hash}&signature=${signature}`;

        // console.log(params);
        const response = await axiosClient.get(`/api/email/verify/${backendLink}`
            
        //     , {
        //   params: {
        //     expires: params.get('expires'),
        //     signature: params.get('signature')
        //   }
        // }
    );
    // console.log(response);
        //setUser(response.data.user);
        // console.log(response.data);
        // setToken(response.data.access_token);
        // // Store the token and user data
        // //localStorage.setItem('ACCESS_TOKEN', response.data.token);
        // //localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('Email verified successfully!')
        sessionStorage.setItem('hostess_otp_email', response.data.email);
        sessionStorage.setItem('hostess_otp_phone', response.data.phone);
        sessionStorage.setItem('hostess_otp_message', response.data.message);
        //setToken(response.data.access_token);
        
        setMessage('Email verified successfully! Redirecting...');
        navigate('/verify-phone');
        //navigate('/dashboard'); // Redirect to your desired page
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div className="verification-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="verification-message">{message}</div>
      )}
    </div>
  );
}

export default VerifyEmail;