import type { GroupedEvents, MeltComponentEvents } from '@melt-ui/svelte/internal/types'

export const inputEvents = {
  root: ['click'] as const,
  input: ['focus', 'blur', 'input', 'keydown'] as const,
  clear: ['click'] as const
}

export type InputEvents = GroupedEvents<typeof inputEvents>
export type InputComponentEvents = MeltComponentEvents<InputEvents>
