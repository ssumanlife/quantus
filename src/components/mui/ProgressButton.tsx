import { theme } from '@/styles/theme'
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import Spinner from './Spinner'

interface Props {
  label: string
  children: React.ReactNode
  handleProgressCheck: () => boolean
  handleNext?: () => void
}

const ProgressButton = ({ label, children, handleProgressCheck, handleNext }: Props) => {
  const [progress, setProgress] = useState(label)

  useEffect(() => {
    if (progress === label) return
    const currentIndex = PROGRESS_STEP.indexOf(progress)

    // 타이머 변수로 저장 및 클린업 처리
    let timer: number | undefined
    if (currentIndex < PROGRESS_STEP.length - 1) {
      timer = setTimeout(() => setProgress(PROGRESS_STEP[currentIndex + 1]), 1500)
    } else {
      timer = setTimeout(() => {
        setProgress(label)
        if (handleNext) handleNext()
      }, 1500)
    }

    return () => clearTimeout(timer)
  }, [progress])

  const handleProgress = () => {
    const isProgressing = handleProgressCheck()
    if (isProgressing && progress === label) {
      setProgress(PROGRESS_STEP[1])
    }
  }

  // 프로그레스 스텝에 따른 button 생성
  const PROGRESS_STEP_CHILDREN: { [x: string]: React.ReactNode } = {
    [label]: (
      <button onClick={() => handleProgress()} css={[common, basicStyle]}>
        {children}
      </button>
    ),
    WAITING: (
      <button css={[common, borderStyle]}>
        대기중...
        <div css={spinnerWrapper}>
          <Spinner />
        </div>
      </button>
    ),
    PROGRESSING: <button css={[common, borderStyle]}>진행중...</button>,
    QUARTER: <button css={[common, borderStyle, backgroundStyle(false)]}>20%</button>,
    HALF: (
      <button css={[common, borderStyle, backgroundStyle(true)]}>
        <span>50%</span>
      </button>
    )
  }

  const PROGRESS_STEP = Object.keys(PROGRESS_STEP_CHILDREN)

  return <>{PROGRESS_STEP_CHILDREN[progress] ? PROGRESS_STEP_CHILDREN[progress] : null}</>
}

export default ProgressButton

const BUTTON_WIDTH = '210px'
const BUTTON_HEIGHT = '54px'

const common = css`
  width: ${BUTTON_WIDTH};
  height: ${BUTTON_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeights.bold};
`

const basicStyle = css`
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.red});
`

const borderStyle = css`
  position: relative;
  border: 1px solid ${theme.colors.red};
  color: ${theme.colors.white};
  background-color: transparent;
`

const backgroundStyle = (isHalf?: boolean) => css`
  ::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: ${isHalf ? `calc(${BUTTON_WIDTH}/2)` : `40px`};
    height: ${BUTTON_HEIGHT};
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.red});
    border-radius: 6px;
  }
  span {
    position: relative;
    z-index: 1;
    top: 0;
    left: 0;
  }
`

const spinnerWrapper = css`
  position: absolute;
  right: 20px;
`
