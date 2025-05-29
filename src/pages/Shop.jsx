import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ModelImage from '/src/assets/images/model-img.jpg'
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Shop() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShops();
  }, []);

  const { refreshUser } = useStateContext();

  const fetchShops = async () => {
    try {
      const response = await axiosClient.get('api/shops');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = (shopId) => {
    navigate(`/payment-method/${shopId}`);
  };

  return (
    <>
      <Header />
      <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">
        Shop
      </h1>

      <div className="max-w-[1180px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[15px] md:gap-x-[40px]">
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <div className="blog-box text-center" key={index}>
                <div className="blog-inner">
                  <Skeleton height={150} width={"100%"} />
                  <Skeleton height={20} width={"60%"} style={{ margin: "20px auto" }} />
                  <Skeleton height={40} width={"80%"} style={{ margin: "10px auto" }} />
                </div>
              </div>
            ))
          ) : data && data.shops && data.shops.length > 0 ? (
            data.shops.map((item) => (
              <div className="blog-box text-center" key={item.id}>
                <div className="blog-inner">
                  <div className="blog-img bg-[#ffffff] h-99">
                    <img src={item.icon_url} className={`w-full h-full object-cover`} alt="Shop Icon" />
                  </div>
                  <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
                    Price: ${item.price}
                  </h1>
                  <h3
                    onClick={() => handlePaymentClick(item.id)}
                    className="uppercase cursor-pointer font-[400] py-[12px] bg-[#E91E63] mt-[20px] text-white hover:bg-[#F8BBD0]"
                  >
                    GET {item.credits} CREDITS
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <h1 className="text-[24px] font-semibold">Data Not Found</h1>
            </div>
          )}
        </div>
      </div>

      <Footer />

    </>
  );
}

export default Shop;
