import { writable } from 'svelte/store'
import type { CreateFormProps } from './types'
import { withGet, type ToWritableStores } from '@melt-ui/svelte/internal/helpers'
import cloneDeep from 'clone-deep'

type FormInstanceProps = ToWritableStores<Required<Omit<CreateFormProps, 'labelWidth'>>>

export class FormInstance {
  initValue: FormInstanceProps['model']
  value: FormInstanceProps['model']
  rules: FormInstanceProps['rules']
  disabled: FormInstanceProps['disabled']
  constructor(props: FormInstanceProps) {
    const { model, rules, disabled } = props
    this.value = model
    // There is no good way to think of a good way, first deep clone
    this.initValue = withGet(writable(cloneDeep(model.get())))
    this.rules = rules
    this.disabled = disabled
  }

  resetField(field: string) {

  }
}
