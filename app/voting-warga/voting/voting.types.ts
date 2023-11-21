import { JenisPilihan, StatusVoting } from "@/enums"

export type VotingType = {
    id: string
    epochtimeStart: number
    epochtimeEnd: number
    createdAt: Date
    updatedAt: Date
    jenisPilihan: JenisPilihan
    kecamatan: string
    kelurahan: string
    rw: number
    rt?: number | undefined
    status: StatusVoting
}
