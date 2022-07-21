import useAuth from "./useAuth";
import Axios from 'axios';

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const refresh = async() =>{
        const response = await Axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev =>{
            console.log("prev " + JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken}
        })
        return response.data.accessToken;
    }
    return refresh;
}
 
export default useRefreshToken;