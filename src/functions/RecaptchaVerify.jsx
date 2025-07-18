import HCaptcha from "@hcaptcha/react-hcaptcha";
import { toast } from "react-toastify";

export const RecaptchaVerify = (recaptchaToken) => {

    if(import.meta.env.VITE_NOBOTVERIFY_MODE){
        if(!recaptchaToken){
            toast.error('Please verify you are not a robot with hCapctha',{
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            })
            return false;
        }
    }
    return true;
}

export const RecaptchaComponent = ({TokenSetter}) => {
    return <>
    {import.meta.env.VITE_NOBOTVERIFY_MODE &&
        // <ReCAPTCHA
        //         className={`mt-[25px] `}
        //         sitekey={import.meta.env.VITE_RECAPTCHA_SITEKEY} // Replace with your key
        //         onChange={(recaptchaToken) => {TokenSetter(recaptchaToken)}}
        // />
        <HCaptcha
          sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
          onVerify={(token) => {TokenSetter(token)}}
          onExpire={()=>{TokenSetter(null)}}
        />
        }
        </>;
}