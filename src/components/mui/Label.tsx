import { css } from '@emotion/react'

import CustomTooltip from './CustomTooltip'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { theme } from '@/styles/theme'

interface Props {
  title: string
  tooltipMessage?: string
  position?: 'top' | 'right' | 'top-end'
}

const Label = ({ title, tooltipMessage, position }: Props) => {
  return (
    <label css={container} htmlFor={title}>
      {title}
      <TooltipMessage position={position} title={title} tooltipMessage={tooltipMessage} />
    </label>
  )
}

const TooltipMessage = ({ title, position, tooltipMessage }: Props) => {
  if (!tooltipMessage) return null
  return (
    <CustomTooltip position={position} defaultId={title} label={tooltipMessage}>
      <AiOutlineQuestionCircle fill={theme.colors.gray_200} />
    </CustomTooltip>
  )
}

export default Label

const container = css`
  display: flex;
  gap: 4px;
`
