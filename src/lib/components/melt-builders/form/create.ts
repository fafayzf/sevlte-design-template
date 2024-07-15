import {
  createElHelpers,
  makeElement,
  disabledAttr,
  omit,
  withGet,
  effect
} from '@melt-ui/svelte/internal/helpers'

import { setContext, getContext } from 'svelte'
import type { Defaults } from '@melt-ui/svelte/internal/types'
import type { CreateFormProps, CreateFormItemProps } from './types'
import { FormInstance, formKey, formItemKey } from './helper'
import {
  eventOverridable,
  withValueWritable,
  toWritableStores
} from '$lib/components/melt-builders/helpers'
import { writable } from 'svelte/store'

const prefix = 'form'
type FormParts = '' | 'form' | 'form-item'
const { name } = createElHelpers<FormParts>(prefix)

const defaults = {
  disabled: writable(false),
  rules: writable({}),
  defaultModel: {},
  labelWidth: writable('max-content'),
} satisfies Defaults<CreateFormProps>


export function createForm(props?: CreateFormProps) {
  const withDefaults = { ...defaults, ...props }
  const options = toWritableStores(omit(withDefaults, 'model', 'onModelChange'))

  const { disabled } = options

  const modelWritable = withValueWritable(withDefaults?.model ?? defaults.defaultModel)
  const model = eventOverridable(modelWritable, withDefaults?.onModelChange)

  // form instance store
  const formInstance: FormInstance = new FormInstance({
    ...options,
    model
  })
  console.log('formIntance', formInstance);

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

  return {
    elements: {
      root,
      form
    },
    helpers: {
      validate: formInstance.validate,
      validateField: formInstance.validateField,
      resetFields: formInstance.resetFields,
      clearValidate: formInstance.clearValidate,
    }
  }
}

const validateEnums = {
  validating: 'validating',
  error: 'error',
  success: 'success'
}

const formItemDefaults = {
  disabled: false,
} satisfies Defaults<CreateFormItemProps>

export function createFormItem(props: CreateFormItemProps) {
  const withDefaults = { ...formItemDefaults, ...props } satisfies CreateFormItemProps
  const options = toWritableStores(withDefaults)

  const { disabled, field } = options

  const formCtx: FormInstance = getContext(formKey)

  console.log('formCtx', formCtx);


  const dispatchEvent = (item: any) => {
    console.log(item)
  }

  const resetField = () => {
    formCtx.resetFieldValue(field.get())
  }

  const currentFieldValue = formCtx.getModelFieldValue(field.get())
  const validateField = formCtx.validateField(field.get())


  const validateState = writable(validateEnums.validating)
  const validateMessage = writable('')

  effect([currentFieldValue], ([$currentFieldValue]) => {
    const rules = formCtx.rules.get()
    const currentFieldRule = rules[field.get()]
    console.log(currentFieldRule);

    validateState.set($currentFieldValue)
  }, { skipFirstRun: true })

  const formItemContext = {
    field,
    dispatchEvent,
    resetField,
    validateField,
    fieldValue: currentFieldValue,
  }

  if (field.get()) {
    formCtx.addField(formItemContext)
    setContext(formItemKey, formItemContext)
  }

  const formItem = makeElement(name('form-item'), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return (props) => {
        const { disabled } = props

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
    states: {
      validateState,
      validateMessage
    },
    enums: {
      validateEnums
    },
    helpers: {
      resetField,
      validateField,
      clearValidate: null
    }
  }
}
