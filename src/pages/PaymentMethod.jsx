import { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

const PaymenMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  return (
    <>
    <Header />
    <div className="max-w-[1300px] mx-auto mt-[50px]  md:mt-[140px] mb-[50px] md:mb-[150px] px-[15px]">
      <h2 className="text-[34px] font-[400] w-full border-b md:mb-[50px]">Payment Methods</h2>
<div className="max-w-[865px]">
      {/* Payment Method Selection */}
      <div className="mt-4 w-full flex flex-col md:mb-[60px]">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={() => setPaymentMethod("creditCard")}
          />
          <span>Balance or Credit Card</span>
        </label>
        <label className="flex items-center space-x-2 mt-[10px]">
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          <span>PayPal</span>
        </label>
      </div>

      {/* Payment Fields */}
      <div className="mt-6 w-full flex flex-col space-y-4">
        {paymentMethod === "creditCard" && (
          <>
            <div className="flex space-x-4">
              <input type="text" placeholder="Name" className="w-1/2 p-2 bg-[#F5F5F5]" />
              <input type="text" placeholder="Last Name" className="w-1/2 p-2 bg-[#F5F5F5]" />
            </div>
           
            <div className="flex space-x-4  mt-6 md:mt-[35px">
            <input type="text" placeholder="Card Number" className="w-full p-2 bg-[#F5F5F5]" />
              <input type="text" placeholder="EXC" className="w-1/5 p-2 bg-[#F5F5F5]" />
              <input type="text" placeholder="MM/YY" className="w-1/3 p-2 bg-[#F5F5F5]" />
            </div>
            <div className=" max-w-[540px] mt-6 md:mt-[35px]">

            <input type="text" placeholder="Email" className="w-full p-2 bg-[#F5F5F5]" /> 
            </div>
          </>
        )}

        {paymentMethod === "paypal" && (
            <div className=" max-w-[540px] mt-6 md:mt-[35px]">
          <input type="email" placeholder="Email" className="w-full p-2 bg-[#F5F5F5]" />
          </div>
        )}
      </div>
</div>
      {/* Submit Button */}
      <button className="mt-6 md:mt-[100px] w-full bg-[#E91E63] text-white py-2 max-w-[540px]">SUBMIT</button>
    </div>
    <Footer />
    </>
  );
};

export default PaymenMethod;
