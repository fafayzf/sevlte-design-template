import type { BuilderReturn } from "@melt-ui/svelte/internal/types"
import type { createForm } from './create'
export type CreateFormProps = {

}

export type Form = BuilderReturn<typeof createForm>
export type FormElements = Form['elements']
