/// <reference types="svelte" />

import { type ButtonTypes } from '$lib/components/melt-builders'
import { type MeltSize } from '$lib/components/melt-ui/index.d'
export type MButtonProps = {
  /**
   * button basic type
   */
  type?: ButtonTypes,
  /**
   * Button size, default is 'medium'
   */
  size: MeltSize,
  /**
   * Set the delay time to stop executing 'click' events
   */
  delay: number,
  /**
   * When `true`, prevents the user from interacting with the button.
   */
  disabled: boolean
  /**
   * The loading status, the default is false, if it is a string, it can be set to a custom loading icon
   */
  loading: boolean | string
  /**
   * Extended Style Class
   */
  className: string | object
  /**
   * Icons, icon collection address is https://icon-sets.iconify.design/?keyword=mdi
   */
  icon: string
}
