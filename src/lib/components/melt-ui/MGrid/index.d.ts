export type MContianerProps = {
  className?: string
  tag: string
  fluid: boolean
}

export type MRowProps = {
  className?: string
  gutter?: string | number
  justify?: 'start' | 'end' | 'center' | 'around' | 'between' | 'evenly'
  align?: 'top' | 'middle' | 'bottom'
  tag: string
}
