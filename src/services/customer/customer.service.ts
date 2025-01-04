import Customer from "@/apiEndPoints/customer/index"
import APIrequest from "@/utility/axios";
interface SignupInterface {
    name:string;
    email:string;
    phonNumber:string;
    password:string;
    gender:string
}
interface SignInInterface {
    email:string;
    password:string
}
export default {
    async signupService(bodyData:SignupInterface):Promise<void>{
        try{
            const payload = {
                bodyData,
                ...Customer.signUp
            };
            const res = await APIrequest(payload);
            return res
        }catch(error){
            console.log(error)
        }
    },
    async signinService(bodyData:SignInInterface):Promise<void>{
        try{
            const payload = {
                bodyData,
                ...Customer.signIn
            };
            const res = await APIrequest(payload);
            return res
        }catch(error){
            console.log(error)
        }
    }
}