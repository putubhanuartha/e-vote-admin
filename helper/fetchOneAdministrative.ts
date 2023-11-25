import { axiosMainServerCredentials } from "@/config/axios.config"

const fetchOneAdministrative = async () => {
    const data = await axiosMainServerCredentials.get('/admin/get-administrative')
    return data.data
}

export default fetchOneAdministrative