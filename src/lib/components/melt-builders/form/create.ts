import type { Defaults } from '@melt-ui/svelte/internal/types'
import type { CreateFormProps } from './types'
import { createElHelpers, makeElement } from '@melt-ui/svelte/internal/helpers'

const prefix = 'form'
type FormParts = '' | 'form' | 'form-item'
const { name } = createElHelpers<FormParts>(prefix)

const defaults = {

} satisfies Defaults<CreateFormProps>
export function createForm(props?: CreateFormProps) {
  const withDefaults = { ...defaults, ...props } satisfies CreateFormProps

  const root = makeElement(name(), {})

  const form = makeElement(name('form'), {})

  const formItem = makeElement(name('form-item'), {})

  return {
    elements: {
      root,
      form,
      formItem
    }
  }
}
