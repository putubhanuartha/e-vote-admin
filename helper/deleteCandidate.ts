import { axiosMainServerCredentials } from "@/config/axios.config"

const deleteCandidate = async (id: string) => {
    const response = axiosMainServerCredentials.delete(`/admin/delete-candidate?id=${id}`)
    return response
}

export default deleteCandidate