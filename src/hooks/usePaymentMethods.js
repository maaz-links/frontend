// hooks/usePaymentMethods.js
import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';

const usePaymentMethods = (shopId) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axiosClient.get(`api/shop/${shopId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching shop:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, [shopId]);

  const handleStripePaymentIntent = async (paymentMethod, amount) => {
    setIsProcessing(true);

    try {
      const response = await axiosClient.post('/api/create-payment-intent', {
        shopId,
        paymentMethod,
        amount,
      });

      if (response?.data) {
        console.log(response.data.paymentIntentId)
        setClientSecret(response.data.clientSecret);
        setPaymentIntentId(response.data.paymentIntentId)
      }
    } catch (error) {
      console.error('Payment intent creation failed', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      const response = await axiosClient.post('/api/paypal/create-order', {
        shopId: data.shop.id,
      });

      if (response?.data?.approval_url) {
        window.location.href = response.data.approval_url; 
      }
    } catch (error) {
      console.error('PayPal payment failed', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    data,
    loading,
    isProcessing,
    clientSecret,
    paymentIntentId,
    handleStripePaymentIntent,
    handlePayPalPayment,
  };
};

export default usePaymentMethods;
