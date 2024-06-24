import type { Writable } from 'svelte/store'
import type { createInput } from './create'
import type { BuilderReturn } from '@melt-ui/svelte/internal/types'
import type { ChangeFn } from '@melt-ui/svelte/internal/helpers'

export type CreateInputProps = {
  value?: Writable<string | number>
	/**
	 * When `true`, prevents the user from interacting with the input.
	 *
	 * @default false
	 */
  defaultValue?: string | number
  disabled?: boolean
  placeholder?: string
  onValueChange?: ChangeFn<string | number>

}

export type Input = BuilderReturn<typeof createInput>
export type InputElements = Input['elements']
export type InputOptions = Input['options']
export type InputStates = Input['states']
