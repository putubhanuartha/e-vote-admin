import { axiosMainServerCredentials } from "@/config/axios.config"

const addNewForm = async (payload: { titleForm: string, contentForm: string }) => {
    const response = await axiosMainServerCredentials.post('/admin/add-form', payload)
    return response.data
}

export default addNewForm