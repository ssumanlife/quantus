import { theme } from '@/styles/theme'
import { css } from '@emotion/react'
import Label from './Label'

interface Props {
  label: string
  size?: 'small' | 'medium' | 'large'
  unit?: '만원' | '%' | '일'
  placeholder?: string
  value?: number
  handleValue: (value: number | undefined) => void
  message?: string
  minRange?: number
  maxRange: number
  tooltipMessage?: string
}

const Input = ({
  label,
  size = 'large',
  unit,
  placeholder,
  value,
  handleValue,
  message,
  minRange = 1,
  maxRange,
  tooltipMessage
}: Props) => {
  const maxLengthCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (Number(value) < minRange || Number(value) > maxRange || value.length > 10) {
      e.target.value = ''
      handleValue(undefined)
    }
  }

  return (
    <div css={container}>
      <Label title={label} tooltipMessage={tooltipMessage} />
      <div css={wrapper(size)}>
        <input
          id={label}
          type="number"
          placeholder={placeholder}
          maxLength={10}
          value={value ?? ''}
          onInput={maxLengthCheck}
          onChange={(e) => handleValue(e.target.value ? Number(e.target.value) : undefined)}
        />
        <span>{unit}</span>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default Input

const container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    color: ${theme.colors.gray_200};
    font-size: ${theme.fontSizes.b2};
    margin-top: -10px;
  }
`

const wrapper = (size: string) => css`
  position: relative;
  display: flex;
  align-items: center;
  span {
    position: absolute;
    right: 24px;
  }
  input {
    width: 100%;
    text-align: center;
    background-color: transparent;
    font-size: ${theme.fontSizes.h5};
    height: 46px;
    border-radius: 6px;
    border: 1px solid ${theme.colors.gray_200};
    color: ${theme.colors.white};
    ::placeholder {
      color: ${theme.colors.white};
    }
    :focus::placeholder {
      color: transparent;
    }
    :focus {
      border-color: ${theme.colors.primary};
    }
    ${size === 'small' &&
    `
      width: 110px;
    `}
    ${size === 'medium' &&
    `
      width: 152px;
    `}
    :hover:not(:focus) {
      border: 1px solid ${theme.colors.gray_100};
    }
  }
`
