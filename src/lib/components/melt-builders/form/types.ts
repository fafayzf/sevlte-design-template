import type { BuilderReturn } from "@melt-ui/svelte/internal/types"
import type { createForm, createFormItem } from './create'

export type CreateFormProps = {
  disabled?: boolean
  model?: any
  rules?: Record<string, any[]>
  labelWidth?: number | string
}

export type CreateFormItemProps = {
  disabled?: boolean
  field?: string
}

export type Form = BuilderReturn<typeof createForm>
export type FormElements = Form['elements']

export type FormItem = BuilderReturn<typeof createFormItem>
export type FormItemElements = FormItem['elements']
