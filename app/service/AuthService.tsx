import { Post } from "../lib/Request"
export const Login = async(email:string,password:string)=>{
    return await Post("auth/login",{
        email,
        password
    })
}