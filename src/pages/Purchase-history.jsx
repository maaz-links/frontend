import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { ErrorText, getAttachmentURL } from "../functions/Common";

const PurchaseHistory = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useStateContext();
  const [rerender, setRerender] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const [transactions, setTransaction] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);



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
      {user ? ( // Only render content if user exists
        <div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
          <div className="flex flex-col md:flex-row gap-[25px] mb-6">
            <div className="w-full md:w-[10%]">
              <div className="w-[130px] h-[130px] bg-[#F5F5F5]">
                {user.profile_picture_id && <img className={`w-full h-full object-cover`} src={getAttachmentURL(user.profile_picture_id)}></img>}
              </div>
              <div className="mt-4 text-c space-x-6 border-b">
                {["Photo", "Profile", "Personal Data"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-1 font-[700] block transition duration-200 ${activeTab === tab ? "text-[#424242]" : "border-transparent text-black-500 font-medium"
                      }`}
                    onClick={() => navigate(`/profile?tab=${tab}`)//setActiveTab(tab)

                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[90%]">
              <div className="flex items-center">
                <div className="ml-4">
                  <h2 className="text-[24px]">{user.name || 'USER'}</h2>
                  <p className="text-[#424242] italic">Profile Status: <span className="font-semibold">ACTIVE</span></p>
                </div>
              </div>

              <div className="w-full md:w-[98%] mx-auto overflow-x-auto">
                <h1 className="text-xl font-semibold mb-4 mt-4">Purchased History</h1>

                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
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
                        <td className="px-4 py-3 text-sm">{index + 1}</td>
                        <td className="px-4 py-3 text-sm">{item?.shop?.title}</td>
                        <td className="px-4 py-3 text-sm">{item?.shop?.credits}</td>
                        <td className="px-4 py-3 text-sm">${item?.shop?.price}</td>
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
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p>Loading user data...</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default PurchaseHistory;

