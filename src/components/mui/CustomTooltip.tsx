import { Tooltip } from 'react-tooltip'
import { css } from '@emotion/react'
import { theme } from '@/styles/theme'

interface Props {
  label: string
  defaultId?: string
  children: React.ReactNode
  position?: 'top' | 'right' | 'top-end'
}

const CustomTooltip = ({ label, defaultId = label, children, position = 'top' }: Props) => {
  return (
    <div css={container} className={position}>
      <div data-tooltip-id={defaultId} data-tooltip-class-name="tooltip">
        {children}
      </div>
      <Tooltip
        id={defaultId}
        opacity={1}
        className="content"
        classNameArrow="arrow"
        place={position}
        content={label}
        positionStrategy="fixed"
      />
    </div>
  )
}

export default CustomTooltip

const container = css`
  .tooltip {
    border-radius: 10px;
    border: 1px solid ${theme.colors.primary};
    padding: 12px 16px;
    background-color: ${theme.colors.black_200};
    font-size: ${theme.fontSizes.b2};
    color: ${theme.colors.gray_100};
    line-height: 20px;
  }
  .arrow {
    display: none;
  }
  .content {
    z-index: 100;
    max-width: 640px;
    white-space: pre-line;
    background-color: ${theme.colors.black_200};
  }
`
