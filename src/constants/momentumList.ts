import { TOOLTIP_MESSAGE } from './message'

// 모멘텀 마켓 타이밍 인덱스 리스트
export const INDEX = [
  'S&P 500',
  'NASDAQ 100',
  'Russell 2000 지수',
  '다우 존스 산업평균지수',
  'KOSPI',
  '미국 장기 국채 (ICE U.S. Treasury 20+ Year Bond Index)',
  '필라델피아 반도체 지수'
]

// 모멘텀 마켓 타이밍 기준선 Props 리스트
export const BASE_LINE = [
  {
    id: 'baseLine',
    label: '기준선',
    list: ['종가', '고, 저 평균', '고, 저, 종가 평균'],
    tooltipMessage: TOOLTIP_MESSAGE.baseLine
  },
  {
    id: 'baseLineAverage',
    label: '이동평균 (기준선)',
    list: ['EMA', 'SMA'],
    tooltipMessage: ''
  },
  {
    id: 'baseLineDay',
    label: '일수',
    list: ['1', '20', '1 ~ 20까지 입력할 수 있습니다.'],
    tooltipMessage: ''
  }
]

// 모멘텀 마켓 타이밍 경계선 Props 리스트
export const BOUNDARY_LINE = [
  {
    id: 'boundaryLine',
    label: '경계선 (밴드)',
    list: ['변동성 (표준편차)', 'ATR (Average True Range)'],
    tooltipMessage: TOOLTIP_MESSAGE.boundaryLine
  },
  {
    id: 'boundaryLineAverage',
    label: '이동평균 (경계선)',
    list: ['EMA', 'SMA'],
    tooltipMessage: ''
  },
  {
    id: 'boundaryLineDay',
    label: '일수',
    list: ['10', '60', '10 ~ 60까지 입력할 수 있습니다.'],
    tooltipMessage: ''
  }
]
export const WEIGHT = [
  {
    id: 'entryWeight',
    label: '진입 가중치',
    tooltipMessage: TOOLTIP_MESSAGE.entryWeight
  },
  {
    id: 'liquidationWeight',
    label: '청산 가중치',
    tooltipMessage: TOOLTIP_MESSAGE.liquidationWeight
  }
]

// 재진입 마켓 타이밍 Props 리스트
export const REENTRY = [
  {
    id: 'movingPeriod',
    label: '전략 이동 평균선 기간',
    minRange: 5,
    maxRange: 200
  },
  {
    id: 'purchaseCriteria',
    label: '매수 이격도 기준',
    minRange: 0,
    maxRange: 1000000000
  },
  {
    id: 'sellingCriteria',
    label: '매도 이격도 기준',
    minRange: 0,
    maxRange: 1000000000
  }
]
