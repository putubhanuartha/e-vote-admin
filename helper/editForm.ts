import { axiosMainServerCredentials } from "@/config/axios.config"

const editForm = async (payload: { id: string, titleForm: string, contentForm: string }) => {
    const response = await axiosMainServerCredentials.put(`/admin/edit-form?id=${payload.id}`, { titleForm: payload.titleForm, contentForm: payload.contentForm })
    return response.data
}

export default editForm