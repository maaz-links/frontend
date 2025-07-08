import { toast } from "react-toastify";
import axiosClient from "../../axios-client";
import CustomSwal from "../../sweetalert";
import { ROLES } from "../../constants";

export const createChat = async (other_user_id,navigate,refreshUser,myRole,other_user_name,swalheading='',swaltext='') => {
    const result = await CustomSwal.fire({
      title: 'Confirm Action',
      text: myRole == ROLES.KING 
      ? `Are you sure you want to  unlock chat with ${other_user_name}?`
      : `Are you sure you want to send free message to ${other_user_name}?`,
    //   icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  if (result.isConfirmed) {
    try{
      const response = await axiosClient.post('/api/chats/credits',{other_user_id: other_user_id });
      // console.log('buychat',response);
      //alert(response.data.message);
      toast.success(response.data.message,{
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                  })
      refreshUser();
      navigate('/chat');
    } catch (error) {
      //alert(error.response.data.message);
      toast.error(error.response.data.message,{
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                  })
      if(error.response.data.shop_redirect){
        navigate('/shop');
      }
      console.error('Error', error);
    }
  }
  
  }