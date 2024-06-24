import {
  createElHelpers,
  makeElement,
  omit,
  toWritableStores,
  disabledAttr
} from '@melt-ui/svelte/internal/helpers'

import type { CreateButtonProps } from './types'
import type { Defaults } from '@melt-ui/svelte/internal/types'

const prefix = 'button'
const { name } = createElHelpers(prefix)

const defaults = {
  type: 'primary',
  disabled: false,
} satisfies Defaults<CreateButtonProps>

export const createButton = (props?: CreateButtonProps) => {
  const withDefaults = { ...defaults, ...props } satisfies CreateButtonProps

  const options = toWritableStores(withDefaults)

  const { disabled } = options

  const button = makeElement(name(), {
    stores: [disabled],
    returned: ([$disabled]) =>
			({
        'data-disabled': disabledAttr($disabled),
				disabled: disabledAttr($disabled),
				role: 'button',
				type: 'button',
			} as const),
  })


  return {
    elements: {
      button
    },
    options
  }
}
