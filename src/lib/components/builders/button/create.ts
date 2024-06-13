import {
  createElHelpers,
  makeElement,
  omit,
  toWritableStores
} from '@melt-ui/svelte/internal/helpers'

import type { CreateButtonProps } from './type'
import type { Defaults } from '@melt-ui/svelte/internal/types'
import { writable } from 'svelte/store'

const prefix = 'button';
const { name } = createElHelpers(prefix)

const defaults = {
  type: writable('primary')
} satisfies Defaults<CreateButtonProps>

export const createButton = (props?: CreateButtonProps) => {
  const withDefaults = { ...defaults, ...props } satisfies CreateButtonProps
  const button = makeElement(name('button'), {
    returned: () =>
			({
				role: 'button',
				type: 'button',
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
