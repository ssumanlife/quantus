import { MarketStateModel } from '@/types/strategyState'

// 마켓 타이밍 설정 체크시 초기 상태값
export const INITIAL_MARKET_STATE: MarketStateModel = {
  momentum: {
    baseLine: '종가',
    baseLineAverage: 'EMA',
    baseLineDay: 1,
    boundaryLine: '변동성 (표준편차)',
    boundaryLineAverage: 'EMA',
    boundaryLineDay: 20,
    entryWeight: 1.5,
    liquidationWeight: 3
  },
  reentry: {
    movingAverageMethod: 'SMA',
    movingPeriod: 20,
    purchaseCriteria: 100,
    sellingCriteria: 100
  }
}
