import { StatsPemilihan } from "@/components/stats-pemilihan"

export enum StatusAkunWarga {
    terdaftar = "terdaftar", belum_terdaftar = "belum terdaftar"
}
export type DataWargaType = {
    id: string
    nama: string
    nik: string
    email: string
    status: StatusAkunWarga
}


export const dataAdmin = {
    username: "admin",
    password: "admin"
}

export const dataWarga: DataWargaType[] = [{
    id: "asdpasodjpjoqjw",
    nama: "Faiz Rifqi",
    nik: "129301293801238",
    email: "aryabhanu03@gmail.com",
    status: StatusAkunWarga.terdaftar
}, { nama: "Putu Arya", nik: "190230192038123", id: "iajsdoaisjdoaisdjioj", email: "kutil@gmail.com", status: StatusAkunWarga.belum_terdaftar }]