// 자산군 상태 타입
export interface AssetStatesModel {
  type: string
  asset: string
  percent: number | undefined
  hasExchangeRate: boolean
}

// 마켓 타이밍 상태 타입
export interface MarketStateModel {
  momentum: {
    baseLine: string
    baseLineAverage: string
    baseLineDay: number | undefined
    boundaryLine: string
    boundaryLineAverage: string
    boundaryLineDay: number | undefined
    entryWeight: number | undefined
    liquidationWeight: number | undefined
  } | null
  reentry: {
    movingAverageMethod: string
    movingPeriod: number | undefined
    purchaseCriteria: number | undefined
    sellingCriteria: number | undefined
  } | null
}
