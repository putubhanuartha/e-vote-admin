import { axiosMainServerCredentials } from "@/config/axios.config"
import fetchAllForms from "@/helper/fetchAllForms"
import fetchAvailableVoting from "@/helper/fetchAvailableVoting"
import fetchForm from "@/helper/fetchForm"
import fetchOneAdministrative from "@/helper/fetchOneAdministrative"
import fetchStatsWarga from "@/helper/fetchStatsWarga"
import { useQuery } from "@tanstack/react-query"

export const useFetchAllWarga = (keyword: string | undefined | null) => {
    return useQuery({
        queryKey: ["statswarga", keyword],
        queryFn: () => fetchStatsWarga(keyword),
    })
}

export const useFetchAvailableVoting = () => {
    return useQuery({
        queryKey: ["voting"],
        queryFn: fetchAvailableVoting,
        retry: false
    })
}

export const useFetchOneAdministrative = () => {
    return useQuery({
        queryKey: ["administrative"],
        queryFn: fetchOneAdministrative,
        retry: false,
        throwOnError: (err) => {
            window.location.href = '/create-administrative'
            return false
        }
    })
}

export const useFetchAllForms = () => {
    return useQuery({ queryKey: ["form"], queryFn: fetchAllForms, retry: false })
}

export const useFetchOneForm = (id: string) => {
    return useQuery({ queryKey: ["form", id], queryFn: () => fetchForm(id) })
}

export const useCheckAuth = () => {
    return useQuery({ queryKey: ["auth"], queryFn: async () => await axiosMainServerCredentials.get('/admin/check-auth'), retry: false })
}