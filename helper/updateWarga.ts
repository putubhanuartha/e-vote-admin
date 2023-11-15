import { axiosMainServerCredentials } from "@/config/axios.config";
import { DataWargaType } from "@/data/data";

const updateWarga = async (args: DataWargaType) => {
    const { id, email, nama, nik } = args
    console.log(id)
    const res = await axiosMainServerCredentials.put(`/admin/update-warga?id=${id}`, { email, nama, nik })
    return res.data
}

export default updateWarga