import { axiosMainServerCredentials } from "@/config/axios.config"
import { JenisPilihan } from "@/enums"

const addAdministrativeData = async ({ kecamatan, kelurahan, rt, rw, jenisPilihan }: { kecamatan: string, kelurahan: string, rt?: number, rw: number, jenisPilihan: JenisPilihan }) => {
    const response = await axiosMainServerCredentials.post('/admin/create-administrative', { kecamatan, kelurahan, rt, rw, jenisPilihan })
    return response
}

export default addAdministrativeData