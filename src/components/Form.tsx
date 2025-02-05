import { css } from '@emotion/react'
import Dropdown from './atoms/Dropdown'
import { ALGORITHM, REBALANCING } from '@/constants/settingsList'
import { theme } from '@/styles/theme'
import useStrategyStore from '@/stores/useStrategyStore'
import Input from './atoms/Input'
import AssetContainer from './AssetContainer'
import MarketContainer from './MarketContainer'
import { useParams } from 'react-router-dom'
import Calendar from './atoms/Calendar'
import { PLACEHOLDER, RANGE_MESSAGE } from '@/constants/message'

const Form = () => {
  const {
    algorithm,
    initialInvestmentAmount,
    cycleRebalancing,
    bandRebalancing,
    startDate,
    endDate
  } = useStrategyStore((state) => state)
  const { setField, setDate } = useStrategyStore((state) => state)
  const { algorithm: id } = useParams() as { algorithm: string }

  // params에 따른 DOM 렌더링
  const DOM_LIST: { [x: string]: { [y: string]: React.ReactElement } } = {
    static_alloc: {
      // 주기 리밸런싱
      cycle_rebalancing: (
        <Dropdown
          label="주기 리밸런싱"
          list={Object.values(REBALANCING).map((i) => i.name)}
          handleSelect={(item) => setField('cycleRebalancing', item)}
          activeItem={cycleRebalancing}
          placeholder={PLACEHOLDER.cycleRebalancing}
        />
      ),
      // 밴드 리밸런싱
      band_rebalancing: (
        <Input
          label="밴드 리밸런싱"
          unit="%"
          value={bandRebalancing}
          handleValue={(value) => setField('bandRebalancing', value)}
          minRange={0}
          maxRange={100}
          placeholder={PLACEHOLDER.bandRebalancing}
          message={RANGE_MESSAGE.oneToHundred}
        />
      ),
      // 자산군 추가
      asset_Container_dom: <AssetContainer />,
      // 마켓 타이밍 설정
      market_container_dom: <MarketContainer />
    }
  }

  return (
    <section css={container}>
      <div>
        <h3 css={title}>
          <span>[필수]</span>자산배분 설정
        </h3>
        <div css={settingsWrapper}>
          <Dropdown
            label="자산배분 알고리즘"
            list={Object.values(ALGORITHM).map((i) => i.name)}
            handleSelect={(item) => setField('algorithm', item)}
            activeItem={algorithm}
            placeholder={PLACEHOLDER.algorithm}
          />
          <Input
            label="초기 투자 금액"
            unit="만원"
            value={initialInvestmentAmount}
            maxRange={1000000000}
            placeholder={PLACEHOLDER.initialInvestmentAmount}
            handleValue={(value) => setField('initialInvestmentAmount', value)}
          />
          {DOM_LIST[id]?.cycle_rebalancing}
          {DOM_LIST[id]?.band_rebalancing}
        </div>
      </div>
      {DOM_LIST[id]?.asset_Container_dom}
      {DOM_LIST[id]?.market_container_dom}
      <div>
        <h3 css={title}>
          <span>[필수]</span>기간 설정
        </h3>
        <div css={calendarWrapper}>
          <Calendar
            label="시작일 설정"
            date={startDate}
            handleDate={(date) => setDate('startDate', date)}
          />
          <Calendar
            label="종료일 설정"
            date={endDate}
            handleDate={(date) => setDate('endDate', date)}
          />
        </div>
      </div>
    </section>
  )
}

export default Form

const container = css`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-top: calc(${theme.height.header} + ${theme.height.strategy_title});
`

const title = css`
  display: flex;
  gap: 8px;
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: 28px;
  span {
    color: ${theme.colors.primary};
  }
`

const settingsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const calendarWrapper = css`
  display: flex;
  justify-content: space-between;
  gap: 80px;
`
