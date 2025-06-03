import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { ErrorText, getAttachmentURL } from "../functions/Common";

const PurchaseHistory = () => {
  const { user, getProvinceName } = useStateContext();
  const [loading, setIsLoading] = useState(false);

  const [transactions, setTransaction] = useState([]);

  const userPurchased = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/api/user-purchased');
      if (response.data.status == true) {
        setTransaction(response.data.transactions);
      }
      setIsLoading(false)

    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    userPurchased();

  }, []);


  return (
    <>

<Header />
      <div className="max-w-[1300px] m-auto mt-[60px] mb-[60px]">
        {/* User Profile Section */}
        <div className=" p-4 flex pb-[0px]">
          <div className="w-[130px] h-[130px] bg-[#F5F5F5]">

            {user.profile_picture_id && <img className={`w-full h-full object-cover`} src={getAttachmentURL(user.profile_picture_id)}></img>}
          </div>
          <div className="ml-4">
            <h2 className="text-[20px] font-bold">{user.name || 'USER'}</h2>
            <p className="text-[16px] italic mt-[10px]">{getProvinceName(user?.profile?.province_id) || 'City'}</p>
          </div>

        </div>

        <h2 className="ml-auto text-[32px] font-bold text-right border-b pe-[15px]">
          Purchased History
        </h2>

        <div className="mt-[10px] p-10 pt-[0px]">
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      {/* <th className="px-4 py-3 text-left text-sm font-medium">ID</th> */}
                      <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Credits</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Payment Method</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Purchase Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions && transactions.length > 0 && transactions.map((item, index) => (
                      <tr className="border-t">
                        {/* <td className="px-4 py-3 text-sm">{index + 1}</td> */}
                        {/* <td className="px-4 py-3 text-sm">{item?.shop?.title}</td>
                        <td className="px-4 py-3 text-sm">{item?.shop?.credits}</td>
                        <td className="px-4 py-3 text-sm">${item?.shop?.price}</td> */}
                         <td className="px-4 py-3 text-sm">{item?.rec_title}</td>
                        <td className="px-4 py-3 text-sm">{item?.rec_credits}</td>
                        <td className="px-4 py-3 text-sm">${item?.rec_price}</td>
                        <td className="px-4 py-3 text-sm">{item?.payment_method}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(item?.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                    {loading === true && (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <h3>Loading....</h3>
                        </td>
                      </tr>
                    )}

                    {transactions && transactions.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <h3>Transactions Not Found</h3>
                        </td>
                      </tr>
                    )}


                  </tbody>
                </table>
              
            </div>


      </div>
      <Footer />
      <>
      
    </>
    </>
  );
};

export default PurchaseHistory;

