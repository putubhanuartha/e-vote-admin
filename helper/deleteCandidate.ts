import { axiosMainServerCredentials } from "@/config/axios.config"

const deleteCandidate = async (args: { id: string, votingId: string }) => {
    const response = axiosMainServerCredentials.delete(`/admin/delete-candidate?id=${args.id}&votingId=${args.votingId}`)
    return response
}

export default deleteCandidate