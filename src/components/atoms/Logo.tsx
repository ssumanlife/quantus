import { css } from '@emotion/react'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="logo" css={link} />
      </Link>
    </div>
  )
}

export default Logo

const link = css`
  width: 172px;
  padding: 20px 20px 20px 0;
`
