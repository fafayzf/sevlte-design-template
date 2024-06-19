import { writable } from "svelte/store"

export function useTagView() {
  const tagView = writable(null)

  const unsub = tagView.subscribe((value) => {
    console.log(value)
  })

  return {
    tagView,
    destory: unsub
  }
}
