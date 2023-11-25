import { axiosMainServerCredentials } from "@/config/axios.config"

const fetchAllForms = async () => {
    const response = await axiosMainServerCredentials.get('/admin/get-forms')
    return response.data
}

export default fetchAllForms