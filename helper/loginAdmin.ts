import { axiosMainServerCredentials } from "@/config/axios.config"

const loginAdmin = async ({ username, password }: { username: string, password: string }) => {
    const response = await axiosMainServerCredentials.post('/admin/login', { username, password })
    return response
}

export default loginAdmin