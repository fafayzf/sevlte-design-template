export type MFormProps = {
  /**
   * Utilities for specifying the columns in a grid layout, docs https://www.tailwindcss.cn/docs/grid-template-columns
   * @default 1
   */
  cols?: number
  /**
   * Utilities for controlling gutters between grid and flexbox items, docs https://www.tailwindcss.cn/docs/gap
   * @default 1
   */
  gap: number | { x: number, y: number }
}
