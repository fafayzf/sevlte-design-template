import type { Updater, Writable } from 'svelte/store'
import { withGet } from '@melt-ui/svelte/internal/helpers'

export type ChangeFn<T> = (args: { curr: T, next: T, event?: string }) => T

export function eventOverridable<T>(_store: Writable<T>, onChange?: ChangeFn<T>) {
  const store = withGet(_store)

  const update = (updater: Updater<T>, event?: string, sideEffect?: (newValue: T) => void) => {
    store.update((curr) => {
      const next = updater(curr)
      let res: T = next
      if (onChange) {
        res = onChange({ curr, next, event })
      }

      sideEffect?.(res)
      return res
    })
  }

  function set(value: T): void
  function set(value: T, event?: string): void
  function set(value: T, event?: string) {
    update(() => value, event)
  }

  return {
    ...store,
    update,
    set,
  }
}
