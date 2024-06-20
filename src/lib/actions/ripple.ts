import { isObject, keyCodes } from '$src/utils'

type CustomElement = HTMLElement & {
  _ripple?: any,
}

type RippleEvent = (MouseEvent | TouchEvent | KeyboardEvent) & { [stopSymbol]?: boolean }

const DELAY_RIPPLE = 80

interface RippleOptions {
  class?: string
  center?: boolean
  circle?: boolean
}

const calculate = (
  e: RippleEvent,
  el: CustomElement,
  value: RippleOptions = {}
) => {
  let localX = 0
  let localY = 0


  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect()
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e

    localX = target.clientX - offset.left
    localY = target.clientY - offset.top
  }

  let radius = 0
  let scale = 0.3
  if (el._ripple?.circle) {
    scale = 0.15
    radius = el.clientWidth / 2
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2
  }

  const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`
  const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`

  const x = value.center ? centerX : `${localX - radius}px`
  const y = value.center ? centerY : `${localY - radius}px`

  return { radius, scale, x, y, centerX, centerY }
}

function isKeyboardEvent (e: RippleEvent): e is KeyboardEvent {
  return e.constructor.name === 'KeyboardEvent'
}

function isTouchEvent (e: RippleEvent): e is TouchEvent {
  return e.constructor.name === 'TouchEvent'
}

function transform (el: HTMLElement, value: string) {
  el.style.transform = value
  el.style.webkitTransform = value
}

const style = {
  container: {
    'color': 'inherit',
    'border-radius': 'inherit',
    'position': 'absolute',
    'width': '100%',
    'height': '100%',
    'left': 0,
    'top': 0,
    'overflow': 'hidden',
    'z-index': 0,
    'pointer-events': 'none',
    'contain': 'strict',
  },
  animation: {
    'color': 'inherit',
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'border-radius': '50%',
    'background': 'currentColor',
    'opacity': '0',
    'pointer-events': 'none',
    'overflow': 'hidden',
    'will-change': 'transform, opacity',
  },
  enter: {
    'transition': 'none',
    'opacity': 0,
  },
  in: {
    transition: 'transform .25s cubic-bezier(0.0, 0, 0.2, 1), opacity .1s cubic-bezier(0.0, 0, 0.2, 1)',
    opacity: '0.25'
  },
  out: {
    transition: 'opacity .3s cubic-bezier(0.0, 0, 0.2, 1)',
    opacity: 0
  }
}

function addStyle(node: HTMLElement, styles: Record<any, any>) {
  const keys = Object.keys(styles)
  keys.forEach((key: any) => {
    node.style[key] = styles[key]
  })
}

function removeStyle(node: HTMLElement, styles: Record<any, any>) {
  const keys = Object.keys(styles)
  keys.forEach((key: any) => {
    node.style[key] = ''
  })
}

const ripples = {
  /* eslint-disable max-statements */
  show (
    e: RippleEvent,
    el: CustomElement,
    value: RippleOptions = {}
  ) {
    if (!el?._ripple?.enabled) {
      return
    }

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'm-ripple__container'
    addStyle(container, style.container)

    if (value.class) {
      container.className += ` ${value.class}`
    }

    const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value)

    const size = `${radius * 2}px`
    animation.className = 'm-ripple__animation'
    addStyle(animation, style.animation)
    animation.style.width = size
    animation.style.height = size

    el.appendChild(container)

    const computed = window.getComputedStyle(el)
    if (computed && computed.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add('m-ripple__animation--enter')
    addStyle(animation, style.enter)
    animation.classList.add('m-ripple__animation--visible')
    // addStyle(animation, style.enter)
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`)
    animation.dataset.activated = String(performance.now())

    setTimeout(() => {
      animation.classList.remove('m-ripple__animation--enter')
      removeStyle(animation, style.enter)
      animation.classList.add('m-ripple__animation--in')
      addStyle(animation, style.in)
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`)
    }, 0)
  },

  hide (el: CustomElement) {
    if (!el?._ripple?.enabled) return

    const ripples = el.getElementsByClassName('m-ripple__animation')

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1] as any

    if (animation.dataset.isHiding) return
    else animation.dataset.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove('m-ripple__animation--in')
      removeStyle(animation, style.in)
      animation.classList.add('m-ripple__animation--out')
      addStyle(animation, style.out)

      setTimeout(() => {
        const ripples = el.getElementsByClassName('m-ripple__animation')
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }

        if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  },
}


export function ripple(node: CustomElement, props: any = {}) {
  updateRipple(node, props, false)

  return {
    update: (value: any) => {
      const wasEnabled = isRippleEnabled(value)
      updateRipple(node, props, wasEnabled)
    }
  }
}

function updateRipple(node: CustomElement, props: any, wasEnabled: boolean) {
  const enabled = isRippleEnabled(props)
  if (!enabled) {
    ripples.hide(node)
  }

  node._ripple = node._ripple ?? {}
  node._ripple.enabled = enabled
  node._ripple.centered = props.center
  node._ripple.circle = props.circle
  if (isObject(props) && props.class) {
    node._ripple.class = props.class
  }

  if (enabled && !wasEnabled) {
    if (props.stop) {
      node.addEventListener('touchstart', rippleStop, { passive: true })
      node.addEventListener('mousedown', rippleStop)
      return
    }

    node.addEventListener('touchstart', rippleShow, { passive: true })
    node.addEventListener('touchend', rippleHide, { passive: true })
    node.addEventListener('touchmove', rippleCancelShow, { passive: true })
    node.addEventListener('touchcancel', rippleHide)

    node.addEventListener('mousedown', rippleShow)
    node.addEventListener('mouseup', rippleHide)
    node.addEventListener('mouseleave', rippleHide)

    node.addEventListener('keydown', keyboardRippleShow)
    node.addEventListener('keyup', keyboardRippleHide)

    node.addEventListener('blur', focusRippleHide)

    // Anchor tags can be dragged, causes other hides to fail - #1537
    node.addEventListener('dragstart', rippleHide, { passive: true })
  } else if (!enabled && wasEnabled) {
    removeListeners(node)
  }

}

function removeListeners (el: HTMLElement) {
  el.removeEventListener('mousedown', rippleShow)
  el.removeEventListener('touchstart', rippleShow)
  el.removeEventListener('touchend', rippleHide)
  el.removeEventListener('touchmove', rippleCancelShow)
  el.removeEventListener('touchcancel', rippleHide)
  el.removeEventListener('mouseup', rippleHide)
  el.removeEventListener('mouseleave', rippleHide)
  el.removeEventListener('keydown', keyboardRippleShow)
  el.removeEventListener('keyup', keyboardRippleHide)
  el.removeEventListener('dragstart', rippleHide)
  el.removeEventListener('blur', focusRippleHide)
}

let keyboardRipple = false

function keyboardRippleShow (e: KeyboardEvent) {
  if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
    keyboardRipple = true
    rippleShow(e)
  }
}

function keyboardRippleHide (e: KeyboardEvent) {
  keyboardRipple = false
  rippleHide(e)
}

function focusRippleHide (e: FocusEvent) {
  if (keyboardRipple) {
    keyboardRipple = false
    rippleHide(e as any)
  }
}

const stopSymbol = Symbol('rippleStop')

function rippleStop(e: RippleEvent) {
  e[stopSymbol] = true
}

function rippleShow (e: RippleEvent) {
  const value: any = {}
  const element = e.currentTarget as CustomElement

  if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return

  // Don't allow the event to trigger ripples on any other elements
  e[stopSymbol] = true

  if (isTouchEvent(e)) {
    element._ripple.touched = true
    element._ripple.isTouch = true
  } else {
    // It's possible for touch events to fire
    // as mouse events on Android/iOS, this
    // will skip the event call if it has
    // already been registered as touch
    if (element._ripple.isTouch) return
  }

  value.center = element._ripple.centered || isKeyboardEvent(e)
  if (element._ripple.class) {
    value.class = element._ripple.class
  }

  if (isTouchEvent(e)) {
    // already queued that shows or hides the ripple
    if (element._ripple.showTimerCommit) return

    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value)
    }
    element._ripple.showTimer = window.setTimeout(() => {
      if (element?._ripple?.showTimerCommit) {
        element._ripple.showTimerCommit()
        element._ripple.showTimerCommit = null
      }
    }, DELAY_RIPPLE)
  } else {
    ripples.show(e, element, value)
  }
}

function rippleHide (e: RippleEvent) {
  const element = e.currentTarget as CustomElement
  if (!element?._ripple) return

  window.clearTimeout(element._ripple.showTimer)

  // The touch interaction occurs before the show timer is triggered.
  // We still want to show ripple effect.
  if (e.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit()
    element._ripple.showTimerCommit = null

    // re-queue ripple hiding
    element._ripple.showTimer = window.setTimeout(() => {
      rippleHide(e)
    })
    return
  }

  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false
    }
  })
  ripples.hide(element)
}


function rippleCancelShow (e: MouseEvent | TouchEvent) {
  const element = e.currentTarget as CustomElement

  if (!element?._ripple) return

  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null
  }

  window.clearTimeout(element._ripple.showTimer)
}

function isRippleEnabled(value: any) {
  return typeof value === 'undefined' || !!value
}
