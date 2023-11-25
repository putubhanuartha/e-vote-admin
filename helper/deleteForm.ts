import { axiosMainServerCredentials } from "@/config/axios.config"

const deleteForm = async (id: string) => {
    const response = await axiosMainServerCredentials.delete(`/admin/delete-form?id=${id}`)
    return response.data
}

export default deleteForm