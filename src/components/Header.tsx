import { css } from '@emotion/react'
import Logo from './atoms/Logo'
import { theme } from '@/styles/theme'
import { PATH } from '@/constants/path'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Header = () => {
  const [selectedNav, setSelectedNav] = useState(PATH.asset_allocation.nav)

  return (
    <header css={container}>
      <div css={wrapper}>
        <Logo />
        <nav>
          {Object.values(PATH).map((item) => (
            <Link to={item.nav} key={item.nav}>
              <button
                css={navButton}
                onClick={() => setSelectedNav(item.nav)}
                className={selectedNav === item.nav ? 'select' : ''}>
                {item.name}
              </button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${theme.colors.gray_500};
  background-color: ${theme.colors.black_100};
  position: fixed;
  z-index: 2;
  height: ${theme.height.header};
  box-sizing: border-box;
`
const wrapper = css`
  width: ${theme.width.base};
  display: flex;
  flex-direction: column;

  transform: translateY(1.2px);
  nav {
    display: flex;
    gap: 50px;
  }
`

const navButton = () => css`
  background-color: transparent;
  color: ${theme.colors.white};
  padding: 14px 2px;
  font-size: ${theme.fontSizes.h5};
  font-weight: ${theme.fontWeights.semiBold};
  &.select {
    border-bottom: 2px solid ${theme.colors.white};
  }
`
