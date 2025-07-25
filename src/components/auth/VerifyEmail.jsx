// src/pages/VerifyEmail.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { toast } from 'react-toastify';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifica della tua E-mail in corso...");
  const [error, setError] = useState(null);
  const { setUser, setToken,setGenericModalOpen,setGenericModalContent } = useStateContext()
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
        // alert('Email verified successfully!')
        // toast.success('Email verified successfully!',{
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        // })
        setGenericModalOpen(true);
        setGenericModalContent(
          <>
            <h1 className="text-[45px] font-bold">Email verificata con successo!</h1>
            <p className="my-4">
              La tua email è stata verificata con successo.
            </p>
            <button
              onClick={() => setGenericModalOpen(false)}
              className="bg-black text-white max-w-[300px] rounded-xl px-6 py-3 hover:bg-gray-800 transition w-full"
            >
              OK
            </button>
          </>
        );
        sessionStorage.setItem('hostess_otp_email', response.data.email);
        sessionStorage.setItem('hostess_otp_phone', response.data.phone);
        sessionStorage.setItem('hostess_otp_message', response.data.message);
        //setToken(response.data.access_token);
        
        setMessage('E-mail verificata con successo! Reindirizzamento in corso...');
        navigate('/verify-phone');
        //navigate('/dashboard'); // Redirect to your desired page
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.message || 'Verifica fallita');
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