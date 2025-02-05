import { css } from '@emotion/react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { PATH } from '@/constants/path'
import { theme } from '@/styles/theme'
import { ALGORITHM } from '@/constants/settingsList'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(`${PATH.asset_allocation.path}/${ALGORITHM.STATIC_ALLOC.id}`)
    }
  }, [location])

  return (
    <div css={container}>
      <Header />
      <main css={mainWrapper}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

const container = css`
  position: relative;
`

const mainWrapper = css`
  width: ${theme.width.base};
  margin: 0 auto;
  padding: 50px 0;
`
