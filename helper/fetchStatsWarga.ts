import { axiosMainServerCredentials } from "@/config/axios.config"

const fetchStatsWarga = async (keyword?: string | undefined) => {
    let response;
    if (keyword) {
        response = await axiosMainServerCredentials.get(`/admin/show-warga?keyword=${keyword}`)
    } else {
        response = await axiosMainServerCredentials.get("/admin/show-warga")
    }

    return response.data
}
export default fetchStatsWarga