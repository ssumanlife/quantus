import { theme } from '@/styles/theme'
import { css } from '@emotion/react'
import { FaCheck } from 'react-icons/fa'
import Label from './Label'

interface Props {
  label: string
  id?: string
  isChecked: boolean
  handleChange: (isChecked: boolean) => void
  tooltipMessage?: string
}

const Checkbox = ({ label, id = label, isChecked, handleChange, tooltipMessage }: Props) => {
  const handleClick = () => handleChange(!isChecked)

  return (
    <div css={container}>
      <input type="checkbox" id={id} css={checkbox} checked={isChecked} onChange={handleClick} />
      <label htmlFor={id} css={labelStyle}>
        <div css={icon}>
          <FaCheck fill={isChecked ? theme.colors.black_100 : theme.colors.gray_200} />
        </div>
      </label>
      <span>
        <Label title={label} tooltipMessage={tooltipMessage} />
      </span>
    </div>
  )
}

export default Checkbox

const container = css`
  display: flex;
  gap: 10px;
  cursor: pointer;
  * {
    cursor: pointer;
  }
  span {
    transform: translateY(4px);
  }
`
const checkbox = css`
  display: none;
  &:checked + label {
    background-color: ${theme.colors.primary};
    border: 2px solid transparent;
  }
`

const labelStyle = css`
  position: relative;
  padding-left: 20px;
  font-size: ${theme.fontSizes.b2};
  color: ${theme.colors.gray_600};
  border-radius: 4px;
  height: 20px;
  border: 2px solid ${theme.colors.gray_200};
`

const icon = css`
  position: absolute;
  top: 4px;
  left: 4px;
`
