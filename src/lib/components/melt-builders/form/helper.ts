import { derived, get } from 'svelte/store'
import type { CreateFormProps } from './types'
import { type ToWritableStores } from '$lib/components/melt-builders/helpers'
import cloneDeep from 'clone-deep'
import Validator from 'async-validator'

export const formKey = Symbol('form')
export const formItemKey = Symbol('formItem')

type RequiredProperties<T> = {
  [P in keyof T]-?: T[P];
}

type FormInstanceProps = ToWritableStores<Required<Omit<CreateFormProps, | 'onModelChange'>>>
type FormInstanceModelProps = RequiredProperties<Pick<CreateFormProps, 'model'>>

export class FormInstance {
  initValue: any
  value: FormInstanceProps['model']
  rules: FormInstanceProps['rules']
  disabled: FormInstanceProps['disabled']
  labelWidth: FormInstanceProps['labelWidth']
  private fields: any[] = []
  validator: Validator | undefined
  constructor(props: FormInstanceProps & FormInstanceModelProps) {
    const { model, rules, disabled, labelWidth } = props
    this.value = model
    // There is no good way to think of a good way, first deep clone
    this.initValue = cloneDeep(model.get())
    this.rules = rules
    this.disabled = disabled
    this.labelWidth = labelWidth

    rules.subscribe(descriptor => {
      console.log(descriptor, 'desc');


    })
  }

  getModelFieldValue = (field: string) => {
    return derived(this.value, ($model) => $model[field])
  }

  getInitFieldValue = (field: string) => {
    return this.initValue[field]
  }

  resetFieldValue = (field: string) => {
    this.value.update(($value) => {
      const initFieldValue = this.getInitFieldValue(field)
      return {
        ...$value,
        [field]: initFieldValue
      }
    })
  }

  addField = (field: any) => {
    this.fields.push(field)
  }


  validate = (fn: Function) => {
    fn(get(this.value))
  }

  validateField = (field: string) => {
    return (cb: Function) => {
      const currentValue = this.getModelFieldValue(field)
      this.validator?.validate({ [field]: currentValue }, (errors, fields) => {
        if (errors) {
          cb(errors, fields)
        }
      })
    }
  }

  resetFields = () => {
    this.fields.forEach((field: any) => {
      field.resetField()
    })
  }

  clearValidate() {

  }

}


export class FormItemIntance {

}
