import { debounce as lodashDebouonce } from 'lodash-es'

type DebounceOptions = {
  leading?: boolean,
  trailing?: boolean,
  delay?: number,
  handler: Function
}

const defaultDebounceOptions: DebounceOptions = {
  leading: true,
  trailing: false,
  delay: 0,
  handler: () => {}
}

export function debounce(node: HTMLElement, props?: DebounceOptions) {
  const debounceOptions = { ...defaultDebounceOptions, ...props }

  const handleEvent = lodashDebouonce((event) => {
    debounceOptions.handler(event)
  }, debounceOptions.delay, {
    leading: debounceOptions.leading,
    trailing: debounceOptions.trailing
  })

  node.addEventListener('click', handleEvent, true)

  return {
    update(value: DebounceOptions) {
      props = value
    },
    destory() {
      node.removeEventListener('click', handleEvent, true)
    }
  }
}
