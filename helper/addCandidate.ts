import { axiosMainServerCredentials } from "@/config/axios.config"
export type AxiosPostCandidateType = {
    kandidat: string;
    visi: string;
    misi: string;
}
const addCandidate = async (payload: AxiosPostCandidateType & { imageUrl: string, votingId: string }) => {
    const response = await axiosMainServerCredentials.post(`/admin/add-candidate`, payload)
    return response.data
}

export default addCandidate