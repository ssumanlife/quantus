import useToggle from '@/hooks/useToggle'
import useStrategyStore from '@/stores/useStrategyStore'
import { theme } from '@/styles/theme'
import { css } from '@emotion/react'
import { IoIosArrowDown } from 'react-icons/io'
import Dropdown from './mui/Dropdown'
import { GoPlus } from 'react-icons/go'
import { CgClose } from 'react-icons/cg'
import Input from './mui/Input'
import Checkbox from './mui/Checkbox'
import { lengthCheck } from '@/utills/lengthCheck'
import { AssetStatesModel } from '@/types/strategyState'
import { RANGE_MESSAGE } from '@/constants/message'
import { ASSET_LIST } from '@/constants/assetList'

// 자산군 추가 컴포넌트
const AssetContainer = () => {
  const { isOpen, handleToggle } = useToggle()
  const assetStates = useStrategyStore((state) => state.assetStates)

  return (
    <div css={container}>
      <div css={headerWrapper}>
        <h4>자산군 추가</h4>
        <div css={toggle} onClick={handleToggle}>
          {isOpen ? '접기' : '펼치기'}
          <div css={arrowIcon(isOpen)}>
            <IoIosArrowDown fill={theme.colors.primary} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <OpenAssetStates assetList={assetStates} />
      ) : (
        <CloseAssetStates assetList={assetStates} />
      )}
    </div>
  )
}

// 자산군 추가, 열렸을 때 (자산군 추가 및 삭제)
const OpenAssetStates = ({ assetList }: { assetList: AssetStatesModel[] }) => {
  const { addAssetState, deleteAssetState, setAssetState } = useStrategyStore((state) => state)
  return (
    <article css={openAssetsWrapper}>
      {assetList.map((state, index) => (
        <article key={`자산${index + 1}`} css={openAsset}>
          <h5>자산 0{index + 1}</h5>
          <button css={deleteButton} onClick={() => deleteAssetState(index)}>
            <CgClose size={18} />
          </button>
          <Dropdown
            id={`자산${index + 1}`}
            label="종류"
            list={Object.values(ASSET_LIST).map((i) => i.name)}
            handleSelect={(value) => setAssetState(index, 'type', value)}
            activeItem={state.type}
            placeholder="전략"
          />
          <Dropdown
            id={`자산군${index + 1}`}
            label="자산군"
            list={
              Object.values(ASSET_LIST)
                .filter((i) => i.name === assetList[index]?.type)
                ?.map((i) => i.list)[0]
            }
            handleSelect={(value) => setAssetState(index, 'asset', value)}
            activeItem={state.asset}
            isSearching={true}
            maxLength={16}
          />
          <Input
            label="비중"
            unit="%"
            placeholder="0"
            value={state.percent}
            handleValue={(value) => setAssetState(index, 'percent', value)}
            minRange={1}
            maxRange={100}
            message={RANGE_MESSAGE.oneToHundred}
          />
          {state.type.includes('미국') && (
            <div css={exchangeRateWrapper}>
              <label>환율 반영</label>
              <Checkbox
                id={`exchangeRate${index}`}
                label="반영"
                isChecked={state.hasExchangeRate}
                handleChange={(value) => setAssetState(index, 'hasExchangeRate', value)}
              />
            </div>
          )}
        </article>
      ))}
      <button css={plusButton} onClick={addAssetState}>
        <GoPlus fill={theme.colors.gray_100} size={80} />
      </button>
    </article>
  )
}

// 자산군 추가, 닫혔을 때
const CloseAssetStates = ({ assetList }: { assetList: AssetStatesModel[] }) => {
  return (
    <div css={closeAssetsWrapper}>
      {assetList.map((state, index) => (
        <div key={`자산${index + 1}`}>
          <h5>자산 0{index + 1}</h5>
          {state.asset !== '' ? (
            <div css={closeAsset(true)}>{lengthCheck(state.asset, 7)}</div>
          ) : (
            <div css={closeAsset(false)}>선택 안함</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AssetContainer

const container = css`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.black_300};
  border-radius: 8px;
  padding: 38px 38px 38px 28px;
  gap: 20px;
`

const headerWrapper = css`
  position: relative;
  display: flex;
  gap: 16px;
  align-items: center;
  h4 {
    font-weight: ${theme.fontWeights.bold};
  }
`

const toggle = css`
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.b1};
  gap: 10px;
  right: 0;
`

const arrowIcon = (isOpen: boolean) => css`
  display: flex;
  ${isOpen &&
  `
    top: 8px;
    transform: rotate(180deg);
  `}
`

const openAssetsWrapper = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 28px;
`

const openAsset = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 38px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.gray_100};
  padding: 38px 28px;
  h5 {
    text-align: center;
    font-weight: ${theme.fontWeights.bold};
  }
`
const deleteButton = css`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  svg {
    path {
      fill: ${theme.colors.gray_100};
    }
  }
  :hover {
    svg {
      path {
        fill: ${theme.colors.gray_100};
      }
    }
  }
`

const exchangeRateWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const plusButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border: 1px solid ${theme.colors.gray_100};
  background-color: transparent;
  border-radius: 12px;
  :hover {
    background-color: ${theme.colors.gray_800};
  }
`

const closeAssetsWrapper = css`
  display: flex;
  gap: 0 32px;
  flex-wrap: wrap;
  h5 {
    font-weight: ${theme.fontWeights.bold};
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

const closeAsset = (hasAsset: boolean) => css`
  border-radius: 19px;
  padding: 12px 16px;
  background-color: ${theme.colors.black_100};
  ${hasAsset &&
  `
    background-color:${theme.colors.gray_600};
  `}
`
