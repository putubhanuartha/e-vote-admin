import { axiosMainServerCredentials } from "@/config/axios.config"

const fetchAllActiveCandidates = async (votingId: string) => {
    const data = await axiosMainServerCredentials.get(`/admin/get-active-candidates?votingId=${votingId}`)
    return data.data
}

export default fetchAllActiveCandidates