import { InputFormType } from "@/enums";
import { DynamicFormType } from "@/types";

export const defaultText: DynamicFormType = {
    title: "Siapa nama anda?",
    type: InputFormType.text,
    id: "text_"
}

export const defaultTextarea: DynamicFormType = {
    title: "Deskripsikan diri anda !",
    type: InputFormType.textarea,
    id: "textarea_"
}

export const defaultCheckbox: DynamicFormType = {
    title: "Pilih banyak opsi",
    type: InputFormType.checkbox,
    option: ["Opsi 1"],
    id: "checkbox_"
}

export const defaultSelect: DynamicFormType = {
    title: "Pilih salah satu opsi",
    type: InputFormType.radio,
    option: ["Opsi 1"],
    id: "radio_"
}