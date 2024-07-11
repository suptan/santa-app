import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export interface ButtonProps {
  children?: ReactNode
  className?: string
  color: 'primary' | 'secondary'
  disabled?: boolean
  href?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: MouseEventHandler<HTMLElement>
}