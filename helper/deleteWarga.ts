import { axiosMainServerCredentials } from "@/config/axios.config"

const deleteWarga = async (id: string) => {
    const res = await axiosMainServerCredentials.delete(`/admin/delete-warga?id=${id}`)
    return res.data
}
export default deleteWarga