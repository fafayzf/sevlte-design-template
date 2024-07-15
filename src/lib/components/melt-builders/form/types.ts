import type { BuilderReturn } from "@melt-ui/svelte/internal/types"
import type { createForm, createFormItem } from './create'
import type { ChangeFn } from '../helpers/eventOverridable'
import type { Writable } from "svelte/store"

export type CreateFormProps = {
  disabled?: Writable<boolean>
  model?: Writable<any>,
  defaultModel?: any
  rules?: Writable<Record<string, any[]>>
  labelWidth?: Writable<number | string>
  onModelChange?: ChangeFn<any>
}

export type CreateFormItemProps = {
  disabled?: boolean
  field: string
}

export type Form = BuilderReturn<typeof createForm>
export type FormElements = Form['elements']

export type FormItem = BuilderReturn<typeof createFormItem>
export type FormItemElements = FormItem['elements']
export type FormItemStates = FormItem['states']
export type FormItemHelpers = FormItem['helpers']
export type FormItemEnums = FormItem['enums']
