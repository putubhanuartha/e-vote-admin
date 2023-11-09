import fetchStatsWarga from "@/helper/fetchStatsWarga"
import { useQuery } from "@tanstack/react-query"

export const useFetchAllWarga = (keyword: string | undefined | null) => {
    return useQuery({
        queryKey: ["statswarga", keyword],
        queryFn: () => fetchStatsWarga(keyword),
    })
}