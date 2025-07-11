import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import usePaymentMethods from '../hooks/usePaymentMethods';

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentMethod = () => {
  const { shopId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  const {
    data,
    loading,
    isProcessing,
    clientSecret,
    paymentIntentId,
    handleStripePaymentIntent,
    handlePayPalPayment,
  } = usePaymentMethods(shopId);

  const handleSubmit = () => {
    if (data.shop?.price) {
      handleStripePaymentIntent(paymentMethod, data.shop.price);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[1300px] mx-auto mt-[50px] md:mt-[140px] mb-[50px] md:mb-[150px] px-[15px]">
        <h2 className="text-[34px] font-[400] w-full border-b md:mb-[50px]">Payment Methods</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* Payment Method Selection */}
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="payPal"
                checked={paymentMethod === 'payPal'}
                onChange={() => setPaymentMethod('payPal')}
              />
              <span className="font-medium text-lg">Buy With Paypal</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => setPaymentMethod('creditCard')}
              />
              <span className="font-medium text-lg">Buy with Stripe</span>
            </label>

            {/* Stripe Elements wrapper */}
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} shopId={data.shop?.id} paymentIntentId={paymentIntentId} />
              </Elements>
            )}

            {paymentMethod === 'creditCard' && !clientSecret && (
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="mt-6 bg-black  text-white py-3 px-6 rounded-md hover:bg-[#8880fe] transition-colors focus:outline-none"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Pay'}
              </button>
            )}

            {paymentMethod === 'payPal' && (
              <button
                onClick={handlePayPalPayment}
                disabled={isProcessing}
                className="mt-6 bg-black  text-white py-3 px-6 rounded-md hover:bg-[#8880fe] transition-colors  focus:outline-none"
              >
                {isProcessing ? 'Processing...' : `Pay $${data?.shop?.price}`}
              </button>
            )}

              <Link
                to="/shop">
                <button 
                disabled={isProcessing}
                className="mt-6 mx-2 bg-white border-1  hover:bg-[#8880fe] transition-colors text-black hover:text-white py-3 px-6 rounded-md focus:outline-none"
                 >
                {isProcessing ? 'Processing...' : `Back to Shop`}
                </button>
              </Link>
          </div>

          {/* Order Summary */}
          <div className="max-w-[450px] bg-[#F5F5F5] p-6 rounded-md shadow-md">
            <h1 className="text-[22px] mb-3">Item Details</h1>
            {data && data.shop && (
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-1"><strong>Title</strong></td>
                    <td className="text-right">{data.shop.title}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1"><strong>Price</strong></td>
                    <td className="text-right">${data.shop.price}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1"><strong>Credits</strong></td>
                    <td className="text-right">{data.shop.credits}</td>
                  </tr>
                  <tr className="">
                    <td className="py-1"><p className="fw-bold text-[18px]"><strong>Total</strong></p></td>
                    <td className="text-right"><strong className="text-[18px]">${data.shop.price}</strong></td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentMethod;
