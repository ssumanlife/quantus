import Other from '@/components/Other'
import Layout from '@/components/Layout'
import Main from '@/components/Main'
import { PATH } from '@/constants/path'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'

const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: `/asset_allocation/:algorithm?`,
          element: (
            <ProtectedRoutes>
              <Main />
            </ProtectedRoutes>
          )
        },
        {
          path: PATH.invest.nav,
          element: <Other />
        },
        {
          path: PATH.factor_strategy.nav,
          element: <Other />
        },
        {
          path: PATH.strategy.nav,
          element: <Other />
        },
        {
          path: PATH.partnership.nav,
          element: <Other />
        }
      ]
    }
  ],
  { basename: '/quantus' }
)

export default Router
