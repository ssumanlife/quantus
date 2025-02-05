import { css } from '@emotion/react'

const Other = () => {
  return (
    <div css={container}>
      <h1>준비 중입니다.</h1>
    </div>
  )
}

export default Other

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  align-self: center;
`
