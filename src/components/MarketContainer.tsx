import { css } from '@emotion/react'
import Checkbox from './mui/Checkbox'
import useToggle from '@/hooks/useToggle'
import Dropdown from './mui/Dropdown'
import { BASE_LINE, BOUNDARY_LINE, INDEX, REENTRY, WEIGHT } from '@/constants/momentumList'
import Input from './mui/Input'
import Radio from './mui/Radio'
import useStrategyStore from '@/stores/useStrategyStore'
import { MarketStateModel } from '@/types/strategyState'
import { useEffect } from 'react'
import { PLACEHOLDER, RANGE_MESSAGE, TOOLTIP_MESSAGE } from '@/constants/message'
import { theme } from '@/styles/theme'

// 마켓 타이밍 설정 컴포넌트
const MarketContainer = () => {
  const { isOpen: isMomentumOpen, handleToggle: handleMomentumToggle } = useToggle()
  const { isOpen: isReentryOpen, handleToggle: handleReentryToggle } = useToggle()

  const marketState = useStrategyStore((state) => state.marketState)
  const { addMarketState, setMarketState } = useStrategyStore((state) => state)

  useEffect(() => {
    if (marketState.momentum === null && isMomentumOpen) handleMomentumToggle()
    if (marketState.reentry === null && isReentryOpen) handleReentryToggle()
  }, [marketState])

  // 모멘텀 마켓타이밍 기준선 & 경계선 렌더 그룹
  const renderMomentumLineGroup = (group: typeof BASE_LINE | typeof BOUNDARY_LINE) => (
    <div css={gridWrapper(3)} key={group[0].label}>
      {group.map((m, index) =>
        m.label !== '일수' ? (
          <Dropdown
            key={m.label + index}
            label={m.label}
            list={m.list}
            handleSelect={(value: string) => setMarketState('momentum', m.id, value)}
            activeItem={marketState.momentum?.[m.id as keyof MarketStateModel['momentum']] || ''}
            tooltipMessage={m.tooltipMessage}
            maxLength={18}
          />
        ) : (
          <Input
            key={m.label + index}
            label={m.label}
            unit="일"
            minRange={Number(m.list[0])}
            maxRange={Number(m.list[1])}
            handleValue={(value: number | undefined) => setMarketState('momentum', m.id, value)}
            message={m.list[2]}
            value={marketState.momentum?.[m.id as keyof MarketStateModel['momentum']] || undefined}
            tooltipMessage={m.tooltipMessage}
          />
        )
      )}
    </div>
  )

  // 모멘텀 마켓타이밍 가중치 렌더 그룹
  const renderWeightInputGroup = () => (
    <div css={gridWrapper(2)}>
      {WEIGHT.map((w) => (
        <Input
          key={w.label}
          label={w.label}
          maxRange={5}
          value={marketState.momentum?.[w.id as keyof MarketStateModel['momentum']] || undefined}
          message={RANGE_MESSAGE.oneToFive}
          handleValue={(value: number | undefined) => setMarketState('momentum', w.id, value)}
          tooltipMessage={w.tooltipMessage}
        />
      ))}
    </div>
  )

  // 재진입 마켓타이밍 렌더 그룹
  const renderReentryInputGroup = () =>
    REENTRY.map((r, index) => (
      <Input
        key={r.id}
        label={r.label}
        minRange={r.minRange}
        maxRange={r.maxRange}
        unit={index === 0 ? '일' : undefined}
        value={marketState.reentry?.[r.id as keyof MarketStateModel['reentry']] || undefined}
        handleValue={(value: number | undefined) => setMarketState('reentry', r.id, value)}
        message={index === 0 ? RANGE_MESSAGE.fiveToTwoHundred : undefined}
      />
    ))

  return (
    <div css={container}>
      <h3>마켓 타이밍 설정</h3>
      <article css={[momentumContainer, container]}>
        <Checkbox
          label="모멘텀 마켓 타이밍"
          isChecked={isMomentumOpen}
          handleChange={() => {
            handleMomentumToggle()
            addMarketState('momentum', !isMomentumOpen)
          }}
          tooltipMessage={TOOLTIP_MESSAGE.momentum}
        />
        {/* 모멘텀 마켓 타이밍 체크시 필드 렌더링 */}
        {isMomentumOpen && (
          <>
            <Dropdown
              label="인덱스"
              list={INDEX}
              handleSelect={() => {}}
              activeItem={INDEX[0]}
              placeholder={PLACEHOLDER.marketIndex}
            />
            {[BASE_LINE, BOUNDARY_LINE].map(renderMomentumLineGroup)}
            {renderWeightInputGroup()}
          </>
        )}
      </article>
      <article css={container}>
        <Checkbox
          label="재진입 마켓 타이밍"
          isChecked={isReentryOpen}
          handleChange={() => {
            handleReentryToggle()
            addMarketState('reentry', !isReentryOpen)
          }}
          tooltipMessage={TOOLTIP_MESSAGE.reentry}
        />
        {/* 제진입 마켓 타이밍 체크시 필드 렌더링 */}
        {isReentryOpen && (
          <>
            <Radio
              label="전략 이동평균선 방법"
              activeItem={
                marketState.reentry?.['movingAverageMethod' as keyof MarketStateModel['reentry']] ||
                ''
              }
              list={['SMA', 'EMA', 'HMA']}
              handleValue={(value: string) =>
                setMarketState('reentry', 'movingAverageMethod', value)
              }
              tooltipMessage={[TOOLTIP_MESSAGE.sma, TOOLTIP_MESSAGE.ema, TOOLTIP_MESSAGE.hma]}
            />
            {renderReentryInputGroup()}
          </>
        )}
      </article>
    </div>
  )
}

export default MarketContainer

const container = css`
  display: flex;
  flex-direction: column;
  gap: 38px;
`

const momentumContainer = css`
  border-bottom: 1px solid ${theme.colors.gray_700};
  padding-bottom: 28px;
`

const gridWrapper = (repeat: number) => css`
  display: grid;
  grid-template-columns: repeat(${repeat}, 1fr);
  gap: 28px;
`
