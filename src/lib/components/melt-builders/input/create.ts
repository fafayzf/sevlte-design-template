import {
  makeElement,
  createElHelpers,
  toWritableStores,
  disabledAttr,
  generateIds,
  executeCallbacks,
  addMeltEventListener,
  isHTMLElement,
  omit,
  overridable,
  kbd,
  withGet
} from '@melt-ui/svelte/internal/helpers'

import type { CreateInputProps } from './types'
import { writable, type Stores } from 'svelte/store'
import type { Defaults, MeltActionReturn } from '@melt-ui/svelte/internal/types'
import type { InputEvents } from './event'
import { focusInput } from './helper'


const prefix = 'input'
type InputParts = '' | 'input' | 'clear-trigger'
const { name, attribute } = createElHelpers<InputParts>(prefix)

const defaults = {
  disabled: false,
  placeholder: '',
  defaultValue: ''
} satisfies Defaults<CreateInputProps>

export function createInput(props?: CreateInputProps) {
  const withDefaults = { ...defaults, ...props } satisfies CreateInputProps

  const meltIds = toWritableStores({
    ...generateIds(['root', 'input'])
  })

  const options = toWritableStores(omit(withDefaults, 'value'))

  const { disabled, placeholder } = options

  const valueWritable = withDefaults?.value ?? writable(defaults.defaultValue)
  const value = overridable(valueWritable, withDefaults?.onValueChange)

  const eventType = writable('')

  const root = makeElement(name(), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        'data-melt-id': meltIds.root,
        'data-disabled': disabledAttr($disabled),
        disabled: disabledAttr($disabled)
      } as const
    },
    action: (node: HTMLElement): MeltActionReturn<InputEvents['root']> => {
      const unsub = executeCallbacks(
        addMeltEventListener(node, 'click', (e) => {
					const target = e.target
					if (!isHTMLElement(target)) return
          if (target.hasAttribute(attribute())) {
            e.preventDefault()
            focusInput(meltIds.input.get())
          }
        })
      )

      return {
        destroy: unsub
      }
    }
  })

  const input = makeElement(name('input'), {
    stores: [value, disabled, meltIds.input, placeholder],
    returned: ([$value, $disabled, $inputId, $placeholder]) => {
      return {
        id: $inputId,
        'data-melt-id': $inputId,
        'data-disabled': disabledAttr($disabled),
        disabled: disabledAttr($disabled),
        placeholder: $placeholder,
        value: $value
      }
    },
    action: (node: HTMLInputElement): MeltActionReturn<InputEvents['input']> => {
      value.update((v) => {
        v = node.value
        return v
      })

      const unsub = executeCallbacks(
        addMeltEventListener(node, 'keydown', (e) => {
          if (e.key === kbd.ENTER) {
            e.preventDefault()
            const nodeValue = node.value
            if (!nodeValue) return
            value.set(node.value)
            eventType.set('keydown')
          }
        }),
        addMeltEventListener(node, 'blur', (e) => {
          e.preventDefault()
          const nodeValue = node.value
          if (!nodeValue) return
          value.set(node.value)
          eventType.set('blur')
        }),
        addMeltEventListener(node, 'input', () => {
          value.set(node.value)
          eventType.set('input')
        })
      )

      return {
        destroy: unsub
      }
    }
  })

  const clearTrigger = makeElement(name('clear-trigger'), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        'data-disabled': disabledAttr($disabled),
        disabled: disabledAttr($disabled),
      } as const
    },
    action: (node: HTMLElement): MeltActionReturn<InputEvents['clear']> => {
      function handleDelete() {
				if (node.hasAttribute('data-disabled')) return
        const inputEl = document.getElementById(meltIds.input.get()) as HTMLInputElement
        inputEl.value = ''
        value.set('')
        console.log(value.get());

        eventType.set('clear')
				focusInput(meltIds.input.get())
			}

      const unsub = executeCallbacks(
        addMeltEventListener(node, 'click', (e) => {
          e.stopPropagation()
          handleDelete()
        })
      )

      return {
        destroy: unsub
      }
    }
  })

  return {
    elements: {
      root,
      input,
      clearTrigger
    },
    states: {
      value,
      eventType
    },
    options
  }
}
