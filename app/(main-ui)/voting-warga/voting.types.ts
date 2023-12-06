import { StatusVoting } from "@/enums"
import { AdministrativeType } from "@/types"
export type VotingType = {
    id: string
    epochtimeStart: number
    epochtimeEnd: number
    createdAt: Date
    updatedAt: Date
    status: StatusVoting,
    AdministrativeId: string,
    Administrative: AdministrativeType
}



export type WargaType = {
    nama: string,
    nik: string,
    email: string
}
export type CandidateType = {
    id: string,
    visi: string,
    misi: string,
    photoUrl: string,
    WargaId: string,
    createdAt: Date,
    updatedAt: Date
    Warga: WargaType
}

export type VotingCandidateType = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    fk_votingId: string,
    fk_candidateId: string,
    Candidate: CandidateType
}
