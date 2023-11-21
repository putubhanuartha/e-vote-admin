import { IFormVote } from "@/app/voting-warga/voting/vote-form-modal"
import { axiosMainServerCredentials } from "@/config/axios.config"


const addVoting = async (args: IFormVote) => {
    const response = await axiosMainServerCredentials.post(`/admin/add-voting`, args)
    return response.data
}



export default addVoting