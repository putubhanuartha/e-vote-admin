import { axiosMainServerCredentials } from "@/config/axios.config";

const fetchAvailableVoting = async () => {
    const response = await axiosMainServerCredentials.get('/admin/available-voting')
    return response.data
}



export default fetchAvailableVoting