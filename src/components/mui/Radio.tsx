import { theme } from '@/styles/theme'
import { css } from '@emotion/react'
import { GoDotFill } from 'react-icons/go'
import Label from './Label'

interface Props {
  label: string
  list: string[]
  activeItem: string
  handleValue: (value: string) => void
  tooltipMessage?: string[]
}

const Radio = ({ label, list, activeItem, handleValue, tooltipMessage }: Props) => {
  return (
    <div css={container}>
      <Label title={label} />
      <fieldset css={wrapper}>
        {list.map((item, index) => (
          <div key={item} css={itemStyle}>
            {activeItem === item && (
              <div css={icon}>
                <GoDotFill size={20} fill={theme.colors.primary} />
              </div>
            )}
            <input
              type="radio"
              id={item}
              name={label}
              value={item}
              defaultChecked={index === 0 ? true : undefined}
              onClick={() => handleValue(item)}
            />
            <Label
              title={item}
              tooltipMessage={tooltipMessage ? tooltipMessage[index] : undefined}
              position="top-end"
            />
          </div>
        ))}
      </fieldset>
    </div>
  )
}

export default Radio

const container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const wrapper = css`
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
  * {
    cursor: pointer;
  }
`

const itemStyle = css`
  position: relative;
  display: flex;
  gap: 10px;
  input {
    width: 20px;
    height: 20px;
    background-color: transparent;
    appearance: none;
    border-radius: 50%;
    border: 2px solid gray;
  }
  input:checked {
    border: 2px solid ${theme.colors.primary};
  }
  label {
    transform: translateY(2px);
  }
`

const icon = css`
  position: absolute;
`
