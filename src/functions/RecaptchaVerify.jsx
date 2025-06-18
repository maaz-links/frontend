import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

export const RecaptchaVerify = (recaptchaToken) => {

    if(import.meta.env.VITE_RECAPTCHA_MODE){
        if(!recaptchaToken){
            toast.error('Please verify you are not a robot with reCAPTCHA',{
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
    {import.meta.env.VITE_RECAPTCHA_MODE &&
        <ReCAPTCHA
                className={`mt-[25px]`}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITEKEY} // Replace with your key
                onChange={(recaptchaToken) => {TokenSetter(recaptchaToken)}}
        />
        }
        </>;
}