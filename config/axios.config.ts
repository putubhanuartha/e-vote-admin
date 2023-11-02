import axios from "axios";
const mainServerUrl = process.env.NEXT_PUBLIC_MAIN_SERVER_URL as string

const axiosMainServer = axios.create({ baseURL: mainServerUrl })
const axiosMainServerCredentials = axios.create({ baseURL: mainServerUrl, withCredentials: true })
export { axiosMainServer, axiosMainServerCredentials }