import { ALGORITHM } from '@/constants/settingsList'
import { PATH } from '@/constants/path'
import useStrategyStore from '@/stores/useStrategyStore'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  children: React.ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const algorithm = useStrategyStore((state) => state.algorithm)
  const navigate = useNavigate()
  const hasAlgorithm = Object.values(ALGORITHM)
    .map((i) => i.name)
    .includes(algorithm)
  const params = Object.values(ALGORITHM).filter((i) => i.name === algorithm)[0]?.id

  useEffect(() => {
    if (hasAlgorithm && params) {
      navigate(`${PATH.asset_allocation.path}/${params}`)
    } else {
      navigate(`${PATH.asset_allocation.path}/${ALGORITHM.STATIC_ALLOC.id}`)
    }
  }, [params])

  return <>{children}</>
}

export default ProtectedRoutes
