import { writable } from "svelte/store"

export function useTagView() {
  const tagView = writable(null)

  tagView.subscribe((value) => {
    console.log(value)
  })

  return {
    tagView
  }
}
