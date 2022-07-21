import { axiosPrivate } from "../Services/AxiosPrivate";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

/*
Attach inteceptor to Axios Private
*/

const useAxiosPrivate = () =>{
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    

    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            //if there is response, just return response
            response =>response,
            //else, this means access token has been expired
            async(error) =>{
                //console.log("use AxiosPrivate error " + JSON.stringify(error))
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true; //set to true to avoid infinite loop of 403 condition
                    const newAccessToken = await refresh(); //refresh the token and get the new one
                    console.log("new access toke " + newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; 
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        );

        return () =>{
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])
    
    return axiosPrivate;
}

export default useAxiosPrivate;