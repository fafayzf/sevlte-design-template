import {
  createElHelpers,
  makeElement,
  toWritableStores,
  disabledAttr
} from '@melt-ui/svelte/internal/helpers'

import { setContext, getContext } from 'svelte'
import type { Defaults } from '@melt-ui/svelte/internal/types'
import type { CreateFormProps, CreateFormItemProps } from './types'
import { get, writable } from 'svelte/store'
import { eventOverridable } from '$lib/components/melt-builders/helpers'
import { FormInstance } from './helper'

const prefix = 'form'
type FormParts = '' | 'form' | 'form-item'
const { name } = createElHelpers<FormParts>(prefix)

const defaults = {
  disabled: false,
  model: {},
  rules: {}
} satisfies Defaults<CreateFormProps>

const formKey = Symbol('form')

export function createForm(props?: CreateFormProps) {
  const withDefaults = { ...defaults, ...props } satisfies CreateFormProps
  const options = toWritableStores(withDefaults)

  const { disabled, rules, model } = options

  // form instance store
  const formInstance = new FormInstance({
    disabled,
    rules,
    model
  })

  setContext(formKey, formInstance)

  const root = makeElement(name(), {})

  const form = makeElement(name('form'), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        disabled: disabledAttr($disabled),
        'data-disabled': disabledAttr($disabled)
      }
    }
  })

  const validate = (fn: Function) => {
    fn(formInstance.initValue.get())
  }
  const validateField = () => {

  }
  const resetFields = () => {

  }
  const clearValidate = () => {

  }

  return {
    elements: {
      root,
      form
    },
    helpers: {
      validate,
      validateField,
      resetFields,
      clearValidate,
    }
  }
}

const formItemDefaults = {
  disabled: false
} satisfies Defaults<CreateFormItemProps>

export function createFormItem(props?: CreateFormItemProps) {
  const withDefaults = { ...formItemDefaults, ...props } satisfies CreateFormItemProps
  const options = toWritableStores(withDefaults)

  const { disabled } = options

  const formItem = makeElement(name('form-item'), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return (props) => {
        const { disabled, formIntance } = props

        return {
          disabled: disabledAttr($disabled || disabled),
        }
      }
    }
  })

  return {
    elements: {
      formItem
    },
    helpers: {
      resetField: null,
      clearValidate: null
    }
  }
}
