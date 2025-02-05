import { ERROR_MESSAGE } from '@/constants/message'
import useStrategyStore from '@/stores/useStrategyStore'

// 전략 스토어 빈값 체크 훅
const useStateEmptyCheck = () => {
  const {
    title,
    algorithm,
    initialInvestmentAmount,
    cycleRebalancing,
    bandRebalancing,
    assetStates
  } = useStrategyStore((state) => state)

  const handleEmptyCheck = () => {
    if (
      title.trim() === '' ||
      algorithm.trim() === '' ||
      initialInvestmentAmount === undefined ||
      cycleRebalancing.trim() === '' ||
      bandRebalancing === undefined ||
      assetStates.length === 0 ||
      assetStates.some((i) => i.type.trim() === '') ||
      assetStates.some((i) => i.asset.trim() === '') ||
      assetStates.some((i) => i.percent === undefined)
    ) {
      alert(ERROR_MESSAGE.EMPTY)
      return false
    }
    return true
  }
  return { handleEmptyCheck }
}

export default useStateEmptyCheck
