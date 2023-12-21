import { IFormVote } from "@/app/(main-ui)/voting-warga/voting/(components)/vote-form-modal"
import { axiosMainServerCredentials } from "@/config/axios.config"

const editVoting = async (args: IFormVote) => {
    const { id, ...payload } = args
    const response = await axiosMainServerCredentials.put(`/admin/update-voting?id=${id}`, payload)
    return response.data
}

export default editVoting