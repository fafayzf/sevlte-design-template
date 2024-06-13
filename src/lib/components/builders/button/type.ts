import type { createButton } from './create'
import type { BuilderReturn } from '@melt-ui/svelte/internal/types'
import type { Writable } from 'svelte/store'

const buttonTypes = ['primary', 'info', 'warning', 'danger'] as const

export type ButtonTypes = (typeof buttonTypes)[number]

export type CreateButtonProps = {
  /**
   * button types
   */
  type?: Writable<ButtonTypes>
}

export type Button = BuilderReturn<typeof createButton>
export type ButtonElements = Button['elements']
export type ButtonOptions = Button['options']
