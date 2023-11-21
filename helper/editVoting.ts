import { IFormVote } from "@/app/voting-warga/voting/vote-form-modal"
import { axiosMainServerCredentials } from "@/config/axios.config"

const editVoting = async (args: IFormVote & { votingCandidateId: string }) => {
    const { votingCandidateId, id, ...payload } = args
    const response = await axiosMainServerCredentials.put(`/admin/update-voting?id=${id}&votingCandidateId=${votingCandidateId}`, payload)
    return response.data
}

export default editVoting