/// <reference types="svelte" />

import { Writable } from "svelte/store"

export type MInputProps = {
  value?: string | number | Writable<string | number>,
  className?: string,
  placeholder?: string,
  clearable?: boolean,
  disabled?: boolean
}
