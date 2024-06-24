import { getElementByMeltId, isHTMLInputElement } from '@melt-ui/svelte/internal/helpers'

export function focusInput(id: string, pos: 'default' | 'start' | 'end' = 'default') {
	const inputEl = getElementByMeltId(id)
	if (!isHTMLInputElement(inputEl)) return

	inputEl.focus()
	if (pos === 'start') {
		inputEl.setSelectionRange(0, 0)
	} else if (pos === 'end') {
		inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length)
	}
}
