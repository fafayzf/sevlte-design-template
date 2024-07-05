import type { createButton } from './create'
import type { BuilderReturn } from '@melt-ui/svelte/internal/types'

export const buttonTypes = ['default', 'primary', 'info', 'warning', 'danger', 'success'] as const

export type ButtonTypes = (typeof buttonTypes)[number]

export type CreateButtonProps = {
  /**
   * button types
   *
	 * @default 'prmairy'
   */
  type?: ButtonTypes,
	/**
	 * When `true`, prevents the user from interacting with the button.
	 *
	 * @default false
	 */
  disabled?: boolean
}

export type Button = BuilderReturn<typeof createButton>
export type ButtonElements = Button['elements']
export type ButtonOptions = Button['options']
