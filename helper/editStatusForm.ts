import { axiosMainServerCredentials } from "@/config/axios.config";
import { StatusFormFilling } from "@/enums";

const editStatusForm = async (payload: { id: string, status: StatusFormFilling }) => {
    const response = await axiosMainServerCredentials.put(`/admin/edit-status-form?id=${payload.id}`, { status: payload.status })
    return response.data
}

export default editStatusForm