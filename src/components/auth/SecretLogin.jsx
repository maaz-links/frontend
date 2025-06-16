import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { toast } from 'react-toastify';
import { useStateContext } from '../../context/ContextProvider';

function SecretLogin() {
    const { setToken } = useStateContext();
    const [message, setMessage] = useState('Verifying...');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const hash = params.get('hash');
    const expires = params.get('expires');
    const signature = params.get('signature');

    if (!id || !hash || !expires || !signature) {
        navigate('/404');
        return <></>;
    }


    const verifyImpersonation = async () => {
        setLoading(true);
        setMessage('Verifying...');
        setError(null);

        try {
            const response = await axiosClient.get(`/api/verify-impersonation/${id}/${hash}`, {
            params: {
                expires,
                signature
            }
        });

            //BAN LOGIC
            if(response.data.banned){
                navigate(`/am-i-banned/${response.data.username}`);
                return;
              }
            toast.success('Logged in successfully', {
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });

            setToken(response.data.access_token);
            navigate('/profile');
        } catch (err) {
            console.error(err);
            toast.error('Login Link has expired', {
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
            setError(err.response?.data?.message || err.message);
            setMessage('Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Secret Login</h2>

                <button
                    onClick={verifyImpersonation}
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Click to Login'}
                </button>

                {/* <p style={styles.message}>{message}</p> */}

                {/* {error && <div style={styles.error}>{error}</div>} */}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '300px',
    },
    heading: {
        marginBottom: '1rem',
        fontSize: '1.5rem',
        color: '#333',
    },
    button: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: '#E91E63',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '1rem',
    },
    message: {
        marginTop: '0.5rem',
        color: '#666',
    },
    error: {
        marginTop: '1rem',
        color: '#d93025',
        fontWeight: 'bold',
    },
};

export default SecretLogin;
