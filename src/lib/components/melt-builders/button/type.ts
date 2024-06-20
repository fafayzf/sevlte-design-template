import type { createButton } from './create'
import type { BuilderReturn } from '@melt-ui/svelte/internal/types'

export const buttonTypes = ['primary', 'info', 'warning', 'danger', 'success'] as const

export type ButtonTypes = (typeof buttonTypes)[number]

export type CreateButtonProps = {
  /**
   * button types
   */
  type?: ButtonTypes,

  disabled?: boolean
}

export type Button = BuilderReturn<typeof createButton>
export type ButtonElements = Button['elements']
export type ButtonOptions = Button['options']
