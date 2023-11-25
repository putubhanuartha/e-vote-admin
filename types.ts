import { InputFormType, JenisPilihan } from "./enums";

export type AdministrativeType = {
    id: string;
    kecamatan: string;
    kelurahan: string;
    rw: number
    rt?: number | undefined
    jenisPilihan: JenisPilihan
}

export type DynamicFormType = {
    type: InputFormType
    title: string
    option?: string[]
    id: string
}