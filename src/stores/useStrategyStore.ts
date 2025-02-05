import { ASSET_LIST } from '@/constants/assetList'
import { INITIAL_MARKET_STATE } from '@/constants/initialMarketState'

import { AssetStatesModel, MarketStateModel } from '@/types/strategyState'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  title: string
  algorithm: string
  initialInvestmentAmount: number | undefined
  cycleRebalancing: string
  bandRebalancing: number | undefined
  assetStates: AssetStatesModel[]
  marketState: MarketStateModel
  startDate: Date
  endDate: Date
}

interface Action {
  setField: <T extends keyof State>(key: T, value: State[T]) => void
  addAssetState: () => void
  deleteAssetState: (index: number) => void
  setAssetState: (
    index: number,
    type: keyof AssetStatesModel,
    value: string | number | boolean | undefined
  ) => void
  addMarketState: (type: keyof MarketStateModel, isAdd: boolean) => void
  setMarketState: <T extends keyof MarketStateModel>(
    type: T,
    state: keyof MarketStateModel[T] extends never ? string : keyof MarketStateModel[T],
    value: string | number | undefined
  ) => void
  setDate: (type: 'startDate' | 'endDate', date: string | null) => void
  resetState: () => void
}

const initialState = {
  title: '',
  algorithm: '',
  initialInvestmentAmount: undefined,
  cycleRebalancing: '',
  bandRebalancing: undefined,
  assetStates: [],
  marketState: {
    momentum: null,
    reentry: null
  },
  startDate: new Date('2020.01.01'),
  endDate: new Date('2026.02.03')
}

const useStrategyStore = create(
  persist<State & Action>(
    (set) => ({
      ...initialState,
      setField: <T extends keyof State>(key: T, value: State[T]) => set({ [key]: value }),

      // 자산군 초기 객체 추가
      addAssetState: () =>
        set((state) => ({
          assetStates: [
            ...state.assetStates,
            { type: '전략', asset: '', percent: undefined, hasExchangeRate: false }
          ]
        })),

      // 특정 자산군 제거
      deleteAssetState: (index: number) =>
        set((state) => ({
          assetStates: [...state.assetStates.filter((_, idx) => idx !== index)]
        })),

      // 특정 자산군에 각 필드값 추가
      setAssetState: (
        index: number,
        type: keyof AssetStatesModel,
        value: string | number | boolean | undefined
      ) =>
        set((state) => {
          if (type === 'type') {
            if (
              !Object.values(ASSET_LIST)
                .find((i) => i.name === value)
                ?.list.includes(state.assetStates[index].asset)
            ) {
              state.assetStates[index].asset = ''
            }
          }
          return {
            assetStates: state.assetStates.map((asset, idx) =>
              idx === index ? { ...asset, [type]: value } : asset
            )
          }
        }),

      // 체크박스를 통해 마켓 타이밍 state 객체 추가 또는 초기화
      addMarketState: (type: keyof MarketStateModel, isAdd: boolean) =>
        set((state) => {
          if (isAdd) {
            return {
              marketState: {
                ...state.marketState,
                [type]:
                  state.marketState[type] !== null &&
                  Object.keys(state.marketState[type]).length > 0
                    ? state.marketState[type]
                    : { ...INITIAL_MARKET_STATE[type] }
              }
            }
          } else {
            return {
              marketState: {
                ...state.marketState,
                [type]: null
              }
            }
          }
        }),

      // 모멘텀, 재진입 마켓타이밍 필드값 추가
      setMarketState: <T extends keyof MarketStateModel>(
        type: T,
        state: keyof MarketStateModel[T] extends never ? string : keyof MarketStateModel[T],
        value: string | number | undefined
      ) =>
        set((prev) => ({
          marketState: {
            ...prev.marketState,
            [type]: { ...prev.marketState[type], [state]: value }
          }
        })),

      // 시작일, 종료일 설정
      setDate: (type: 'startDate' | 'endDate', date: string | null) =>
        set((state) =>
          date === null ? { ...state, [type]: initialState[type] } : { ...state, [type]: date }
        ),

      // 스토어 상태 초기화
      resetState: () =>
        set((state) => ({
          ...initialState,
          setField: state.setField,
          addAssetState: state.addAssetState,
          deleteAssetState: state.deleteAssetState,
          setAssetState: state.setAssetState,
          addMarketState: state.addMarketState,
          setMarketState: state.setMarketState,
          setDate: state.setDate,
          resetState: state.resetState
        }))
    }),
    {
      name: 'quantus-strategy'
    }
  )
)

export default useStrategyStore
