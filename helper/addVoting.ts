import { IFormVote } from "@/app/(main-ui)/voting-warga/voting/(components)/vote-form-modal"
import { axiosMainServerCredentials } from "@/config/axios.config"


const addVoting = async (args: IFormVote) => {
    const response = await axiosMainServerCredentials.post(`/admin/add-voting`, args)
    return response.data
}



export default addVoting