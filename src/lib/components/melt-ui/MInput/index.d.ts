/// <reference types="svelte" />

import { Writable } from "svelte/store"

export type MInputProps = {
  type?: HTMLInputElement['type'],
  value?: Writable<string | number>,
  className?: string,
  placeholder?: string,
  clearable?: boolean
}
