import { theme } from '@/styles/theme'
import { css } from '@emotion/react'

const Spinner = () => {
  return (
    <div css={container}>
      <div css={spinner}></div>
    </div>
  )
}

export default Spinner

const container = css`
  width: 26px;
`
const spinner = css`
  display: block;
  width: 26px;
  height: 26px;
  background-color: ${theme.colors.black};
  border: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  border-top-color: ${theme.colors.primary_800};
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
