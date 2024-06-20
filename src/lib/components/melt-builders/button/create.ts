import {
  createElHelpers,
  makeElement,
  omit,
  overridable,
  toWritableStores,
} from '@melt-ui/svelte/internal/helpers'

import type { CreateButtonProps } from './type'
import type { Defaults } from '@melt-ui/svelte/internal/types'
import { get, writable } from 'svelte/store'

const prefix = 'button'
const { name } = createElHelpers(prefix)

const defaults = {
  type: 'primary',
  disabled: false,
} satisfies Defaults<CreateButtonProps>

export const createButton = (props?: CreateButtonProps) => {
  const withDefaults = { ...defaults, ...props } satisfies CreateButtonProps

  const disabledWritable = writable(withDefaults.disabled ?? false)
  const disabled = overridable(disabledWritable)

  const button = makeElement(name(), {
    returned: () =>
			({
				role: 'button',
				type: 'button',
        disabled: get(disabled)
			} as const),
  })
  const options = toWritableStores(omit(withDefaults))

  return {
    elements: {
      button
    },
    options
  }
}
