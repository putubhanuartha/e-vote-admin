import { axiosMainServer } from "@/config/axios.config"

const addAdmin = async (payload: { username: string, password: string }) => {
    const response = await axiosMainServer.post('/admin/signup', { username: payload.username, password: payload.password })
    return response
}

export default addAdmin;