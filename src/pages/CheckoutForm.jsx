import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ clientSecret, shopId,paymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { refreshUser } = useStateContext();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe or elements not loaded");
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const exp = elements.getElement(CardExpiryElement);
    const cvc = elements.getElement(CardCvcElement);

    setIsProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      toast.error("Payment failed: " + result.error.message);
      setErrorMessage(result.error.message);
      setIsProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      // toast.success("Payment successful!");
      try {
        const response = await axiosClient.post("api/add/user-credits", {
          payment_method: "stripe",
          shopId,
          paymentIntentId,
        });

        if (response?.data?.status === true) {
          toast.success(response.data.message);
          
        }
      } catch (error) {
        toast.error("Error adding credits.");
      }

      setIsProcessing(false);
      refreshUser();
      navigate('/shop');
    }
  };

  const stripeStyle = {
    base: {
      fontSize: "16px",
      color: "#333",
      letterSpacing: "0.025em",
      fontFamily: "Arial, sans-serif",
      "::placeholder": {
        color: "#999",
      },
      padding: "10px 12px",
    },
    invalid: {
      color: "#FF4D4D",
    },
  };

  const inputClass = "p-3 border border-gray-300 rounded-md mb-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-6 bg-white shadow-lg rounded-md">
      <h3 className="text-2xl font-semibold mb-4">Enter Your Payment Details</h3>

      <div>
        <label className="block text-sm mb-1 font-bold">Card Number</label>
        <div className={inputClass}>
          <CardNumberElement options={{ style: stripeStyle }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 font-bold">Expiry Date</label>
          <div className={inputClass}>
            <CardExpiryElement options={{ style: stripeStyle }} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">CVC</label>
          <div className={inputClass}>
            <CardCvcElement options={{ style: stripeStyle }} />
          </div>
        </div>
      </div>

      {/* Optional ZIP field (not part of Stripe Elements) */}
      {/* 
      <div>
        <label className="block text-sm font-medium mb-1">ZIP Code</label>
        <input type="text" name="zip" className={inputClass + " w-full"} placeholder="12345" />
      </div>
      */}

      {errorMessage && (
        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || isProcessing}
        className="w-full py-3 bg-black hover:bg-[#8880fe] transition-colors text-white font-semibold rounded-md focus:outline-none"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
