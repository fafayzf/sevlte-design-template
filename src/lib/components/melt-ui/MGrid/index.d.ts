export type MContianerProps = {
  /**
   * Extended Style Class
   */
  className?: string
  /**
	 * Custom element tag
	 */
  tag: string
  /**
   * Width full
   */
  fluid: boolean
}

export type MRowProps = {
  /**
   * Extended Style Class
   */
  className?: string
  /**
   * Utilities for controlling gutters between grid and flexbox items, docs https://www.tailwindcss.cn/docs/gap
   * @default 0
   */
  gap: number | { x: number, y: number }
  /**
   * Utilities for specifying the columns in a grid layout, docs https://www.tailwindcss.cn/docs/grid-template-columns
   * @default 12
   */
  cols?: number
  /**
	 * Custom element tag
	 */
  tag: string
}

export type MColProps = {
  /**
   * Extended Style Class
   */
  className?: string
  /**
   * Use the col-span-* utilities to make an element span n columns, docs https://www.tailwindcss.cn/docs/grid-column#spanning-columns
   */
	span: number | string
  /**
   * Use the col-start-* and col-end-* utilities to make an element start or end at the nth grid line. These can also be combined with the col-span-* utilities to span a specific number of columns.
   * docs https://www.tailwindcss.cn/docs/grid-column#starting-and-ending-lines
   */
  start: number | string
  /**
   * docs https://www.tailwindcss.cn/docs/grid-column#starting-and-ending-lines
   */
  end: number | string
  /**
	 * Custom element tag
	 */
	tag: string
}
