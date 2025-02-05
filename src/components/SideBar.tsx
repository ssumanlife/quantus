import { css } from '@emotion/react'
import Button from './mui/Button'
import { PiArrowBendDoubleUpLeftBold } from 'react-icons/pi'
import useStrategyStore from '@/stores/useStrategyStore'
import { theme } from '@/styles/theme'

const SideBar = () => {
  const resetState = useStrategyStore((state) => state.resetState)

  return (
    <aside css={container}>
      <Button variant="filled">하단으로 이동</Button>
      <Button className="initial" onClick={resetState}>
        <PiArrowBendDoubleUpLeftBold />
        설정 값 초기화
      </Button>
    </aside>
  )
}

export default SideBar

const container = css`
  position: fixed;
  top: calc(${theme.height.header} + 30px);
  z-index: 2;
  width: 152px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  button {
    &.initial {
      display: flex;
      gap: 6px;
    }
  }
`
