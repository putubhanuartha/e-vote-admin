import { axiosMainServerCredentials } from "@/config/axios.config"

const fetchForm = async (id: string) => {
    const response = await axiosMainServerCredentials.get(`/admin/get-form?id=${id}`)
    return response.data
}

export default fetchForm