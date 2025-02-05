import { theme } from '@/styles/theme'
import { css } from '@emotion/react'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  size?: 'large' | 'medium' | 'small'
  variant?: 'filled' | 'outline'
  className?: string
}

const Button = ({ children, onClick, size = 'medium', variant = 'outline', className }: Props) => {
  return (
    <button css={btn(size, variant)} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

const btn = (size: string, variant: string) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 6px;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.h5};
  padding: 12px 0;
  ${size === 'small' &&
  `
  width: 110px;
  `}
  ${size === 'medium' &&
  `
  width: 152px;
  `}
    ${size === 'large' &&
  `
  width: 100%;
  `}
  ${variant === 'outline' &&
  `
    border: 1px solid  ${theme.colors.gray_500};
  `}
    ${variant === 'filled' &&
  `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.black_100};
  `}
`
