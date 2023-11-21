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
    rt: number | null
}
export type VotingCandidatesType = {
    id: string
    votingId: string
    candidateId: string | null
    status: StatusVoting
    voting: VotingType
}