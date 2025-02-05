import { css } from '@emotion/react'
import { IoIosArrowDown } from 'react-icons/io'
import { theme } from '@/styles/theme'
import useToggleStore from '@/stores/useToggleStore'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { lengthCheck } from '@/utills/lengthCheck'
import CustomTooltip from './CustomTooltip'
import Label from './Label'
import Button from './Button'

interface Props {
  label: string
  id?: string
  list: string[]
  activeItem: string
  handleSelect: (value: string) => void
  placeholder?: string
  isSearching?: boolean
  maxLength?: number
  tooltipMessage?: string
}

const Dropdown = ({
  label,
  id = label,
  list,
  activeItem,
  handleSelect,
  placeholder,
  isSearching = false,
  maxLength,
  tooltipMessage
}: Props) => {
  const toggleId = useToggleStore((state) => state.toggleId)
  const handleToggle = useToggleStore((state) => state.actions.handleToggle)
  const accordionRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLUListElement>(null)
  const isOpen = toggleId === id

  useEffect(() => {
    if (placeholder && list.includes(placeholder)) {
      handleSelect(placeholder)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [toggleId])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      accordionRef.current &&
      !accordionRef.current.contains(event.target as Node) &&
      panelRef.current &&
      !panelRef.current.contains(event.target as Node)
    ) {
      handleToggle('')
    }
  }

  // 기본 드롭다운 버튼과 검색용 드롭다운 버튼 렌더 그룹
  const BUTTON_RENDER = {
    basic: (
      <Button size="large" css={toggle(isOpen, isSearching)} onClick={() => handleToggle(id)}>
        {placeholder && activeItem === '' ? placeholder : lengthCheck(activeItem, maxLength)}
        <div css={arrowIcon(isOpen)}>
          <IoIosArrowDown fill={theme.colors.primary} />
        </div>
      </Button>
    ),
    search: (
      <CustomTooltip label={activeItem} defaultId="dropdown">
        <Button size="large" css={toggle(isOpen, isSearching)} onClick={() => handleToggle(id)}>
          {placeholder && activeItem === '' ? placeholder : lengthCheck(activeItem, maxLength)}
          <div css={arrowIcon(isOpen)}>
            <IoIosArrowDown fill={theme.colors.primary} />
          </div>
        </Button>
      </CustomTooltip>
    )
  }

  return (
    <div css={container}>
      <Label title={label} tooltipMessage={tooltipMessage} />
      <div css={wrapper} ref={accordionRef}>
        {isSearching ? BUTTON_RENDER.search : BUTTON_RENDER.basic}
        {isOpen && !isSearching && (
          <Panel
            list={list}
            handleSelect={handleSelect}
            activeItem={activeItem}
            panelRef={panelRef}
          />
        )}
        {isOpen && isSearching && (
          <SearchPanel
            list={list}
            handleSelect={handleSelect}
            activeItem={activeItem}
            panelRef={panelRef}
            maxLength={maxLength}
          />
        )}
      </div>
    </div>
  )
}

// 기본 패널 컴포넌트
const Panel = ({
  list,
  activeItem,
  handleSelect,
  panelRef
}: Pick<Props, 'list' | 'activeItem' | 'handleSelect'> & {
  panelRef: React.RefObject<HTMLUListElement>
}) => {
  const handleToggle = useToggleStore((state) => state.actions.handleToggle)
  return (
    <ul css={panelWrapper} ref={panelRef}>
      {list.map((item) => (
        <li
          key={item}
          onClick={() => {
            handleSelect(item), handleToggle('')
          }}
          className={activeItem === item ? 'active' : undefined}>
          {item}
        </li>
      ))}
    </ul>
  )
}

// 검색 패널 컴포넌트
const SearchPanel = ({
  list,
  activeItem,
  handleSelect,
  panelRef,
  maxLength
}: Pick<Props, 'list' | 'activeItem' | 'handleSelect' | 'maxLength'> & {
  panelRef: React.RefObject<HTMLUListElement>
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchList, setSearchList] = useState(list)

  const handleToggle = useToggleStore((state) => state.actions.handleToggle)

  const handleSearchTerm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
      const newSearchList = list.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      )
      if (newSearchList.length > 0) {
        setSearchList(newSearchList)
      }
    },
    [searchTerm]
  )

  return (
    <div css={searchPanelWrapper}>
      <div css={searchPanel}>
        <FiSearch size={24} />
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      <ul ref={panelRef}>
        {searchList?.map((item) => (
          <CustomTooltip label={item} position="right" key={item}>
            <li
              key={item}
              onClick={() => {
                handleSelect(item), handleToggle('')
              }}
              className={activeItem === item ? 'active' : undefined}>
              {lengthCheck(item, maxLength ? maxLength + 2 : undefined)}
            </li>
          </CustomTooltip>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown

const container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const wrapper = css`
  position: relative;
`

const toggle = (isOpen: boolean, isSearching: boolean) => css`
  height: 46px;
  border: 1px solid ${theme.colors.gray_200};
  margin-bottom: 10px;
  ${!isSearching &&
  isOpen &&
  `
    border: 1px solid ${theme.colors.primary};
    :hover {
    border: 1px solid ${theme.colors.primary} !important;
    }
  `}
  ${isSearching &&
  isOpen &&
  `
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid  ${theme.colors.gray_200};
    :hover {
    border: 1px solid ${theme.colors.gray_100};
    }
    `}
  :hover {
    border: 1px solid ${theme.colors.gray_100};
  }
`

const arrowIcon = (isOpen: boolean) => css`
  position: absolute;
  top: 16px;
  right: 24px;
  ${isOpen &&
  `
    top: 8px;
    transform: rotate(180deg);
  `}
`

const panelWrapper = css`
  width: 100%;
  position: absolute;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray_600};
  overflow: hidden;
  z-index: 1;
  background-color: ${theme.colors.black_100};
  cursor: pointer;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    :hover {
      background-color: ${theme.colors.gray_800};
      color: ${theme.colors.white};
    }
    &.active {
      background-color: ${theme.colors.primary_700};
    }
  }
`

const searchPanelWrapper = css`
  position: absolute;
  width: 100%;
  top: 45px;
  z-index: 1;
  background-color: ${theme.colors.black_300};
  height: 400px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid ${theme.colors.gray_200};
  box-sizing: border-box;
  overflow: hidden;
  ul {
    max-height: 346px;
    cursor: pointer;
    overflow: hidden;
    overflow-y: auto;

    li {
      position: relative;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 46px;
      border-bottom: 1px solid ${theme.colors.gray_200};
      :hover {
        border: 1px solid ${theme.colors.gray_100};
      }
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.gray_200};
      border-radius: 10px;
    }
  }
`

const searchPanel = css`
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border: 1px solid ${theme.colors.gray_200};
  input {
    height: 100%;
    width: 100%;
    background-color: transparent;
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.h5};
  }
  :hover {
    border: 1px solid ${theme.colors.gray_100};
  }
`
