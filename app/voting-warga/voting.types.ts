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
