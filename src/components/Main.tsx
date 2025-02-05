import { css } from '@emotion/react'
import Button from './atoms/Button'
import SideBar from './SideBar'
import { theme } from '@/styles/theme'
import useStrategyStore from '@/stores/useStrategyStore'
import Form from './Form'
import ProgressButton from './atoms/ProgressButton'
import useStateEmptyCheck from '@/hooks/useStateEmptyCheck'
import { PLACEHOLDER } from '@/constants/message'
import { ALGORITHM } from '@/constants/settingsList'

const Main = () => {
  const title = useStrategyStore((state) => state.title)
  const algorithm = useStrategyStore((state) => state.algorithm)
  const setField = useStrategyStore((state) => state.setField)
  const { handleEmptyCheck } = useStateEmptyCheck()

  // 전략배분 일 시에만 프로그래스 버튼 동작
  const handleSubmit = () => {
    if (algorithm === ALGORITHM.STATIC_ALLOC.name) {
      return handleEmptyCheck()
    }
    return false
  }

  const handleNext = () => {
    setTimeout(() => alert('이용해주셔서 감사합니다.'), 0)
  }
  // 타이틀, 폼 컴포넌트와 사이드바 레이아웃 + 제출 버튼 그룹
  return (
    <div css={container}>
      <div css={wrapper}>
        <div css={formWrapper}>
          <section css={titleWrapper}>
            <input
              placeholder={PLACEHOLDER.title}
              type="text"
              maxLength={30}
              autoComplete="off"
              value={title}
              onChange={(e) => setField('title', e.target.value)}
            />
            <Button size="small" className={title.trim() !== '' ? 'hasTitle' : undefined}>
              저장
            </Button>
          </section>
          <Form />
        </div>
        <div css={sideWrapper}>
          <SideBar />
        </div>
      </div>
      <div css={buttonWrapper}>
        <ProgressButton
          label="포트 추출"
          handleProgressCheck={handleEmptyCheck}
          handleNext={handleNext}>
          포트 추출
        </ProgressButton>
        <ProgressButton label="백테스트" handleProgressCheck={handleSubmit} handleNext={handleNext}>
          백테스트
        </ProgressButton>
      </div>
    </div>
  )
}

export default Main

const container = css`
  display: flex;
  flex-direction: column;
  gap: 80px;
`

const wrapper = css`
  display: flex;
  position: relative;
  gap: 40px;
`

const formWrapper = css`
  width: ${theme.width.section};
`

const titleWrapper = css`
  width: ${theme.width.section};
  display: flex;
  justify-content: space-between;
  gap: 30px;
  position: fixed;
  top: ${theme.height.header};
  z-index: 2;
  padding: 30px 0;
  background-color: ${theme.colors.black_100};
  input {
    width: 90%;
    background-color: transparent;
    border-bottom: 2px solid ${theme.colors.white};
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.h2};
    font-weight: ${theme.fontWeights.bold};
    ::placeholder {
      color: ${theme.colors.white};
    }
  }
  button {
    color: ${theme.colors.gray_500};
    &.hasTitle {
      border: 1px solid ${theme.colors.primary};
      color: ${theme.colors.white};
    }
  }
`

const sideWrapper = css`
  position: relative;
`

const buttonWrapper = css`
  display: flex;
  justify-content: center;
  gap: 64px;
  margin: 30px;
`
