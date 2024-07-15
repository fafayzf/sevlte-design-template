import { writable, type Writable } from 'svelte/store'
import { withGet, type WithGet } from '@melt-ui/svelte/internal/helpers'

export function isWritable<T>(value: any): value is Writable<T> {
  return value &&
    typeof value.subscribe === 'function' &&
    typeof value.set === 'function' &&
    typeof value.update === 'function'
}

export function withValueWritable<T>(value: T | Writable<T>): Writable<T> {
  const valueWritable = isWritable(value) ? value : writable(value)
  return valueWritable
}

type WrapWritable<T, K extends keyof T> = T[K] extends Writable<any> ? T[K] : Writable<T[K]>

export type ToWritableStores<T extends Record<string, unknown>> = {
  [K in keyof T]: WithGet<WrapWritable<T, K>>
};


export function toWritableStores<T extends Record<string, unknown>>(
	properties: T
): ToWritableStores<T> {
	const result = {} as { [K in keyof T]: WithGet<Writable<T[K]>> }

	Object.keys(properties).forEach((key) => {
		const propertyKey = key as keyof T
		const value = properties[propertyKey]
		result[propertyKey] = withGet(withValueWritable(value))
	})

	return result as ToWritableStores<T>
}
