import DatePicker from 'react-datepicker'
import { css } from '@emotion/react'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import { theme } from '@/styles/theme'

interface Props {
  label: string
  date: Date
  handleDate: (date: string | null) => void
}

const Calendar = ({ label, date, handleDate }: Props) => {
  return (
    <div css={container}>
      <label>{label}</label>
      <div css={wrapper}>
        <DatePicker
          locale={ko}
          dateFormat="yyyy.MM.dd"
          dateFormatCalendar="yyyy년 MM월"
          selected={date ? new Date(date) : null}
          onChange={(date) =>
            handleDate(
              date?.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }) || null
            )
          }
          disabledKeyboardNavigation
          popperPlacement="bottom"
        />
      </div>
    </div>
  )
}

export default Calendar

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  border-radius: 6px;
  overflow: hidden;
  background: transparent;
  border: 1px solid ${theme.colors.gray_200};
  :hover {
    border: 1px solid ${theme.colors.gray_100};
  }
  .react-datepicker-wrapper {
    width: 100%;
    height: 100%;
    flex: 1;
    .react-datepicker__input-container {
      width: inherit;
      height: 100%;

      input {
        width: 100%;
        height: 100%;
        font-size: 18px;
        text-align: center;
        background: transparent;
        color: ${theme.colors.white};
      }
    }
  }

  .react-datepicker-popper .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker {
    background-color: ${theme.colors.gray_800};
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray_600};
    padding: 10px;
    min-width: 356px;
    max-width: 100%;
    .react-datepicker__navigation {
      top: 12px;
    }

    .react-datepicker__current-month {
      font-size: ${theme.fontSizes.h5};
      color: ${theme.colors.white};
    }
    .react-datepicker__header,
    .react-datepicker__month-container {
      width: 100%;
      border-bottom: none;
      background-color: ${theme.colors.gray_800};
    }

    .react-datepicker__navigation-icon::before {
      border-color: ${theme.colors.white};
    }

    .react-datepicker__day-names {
      padding: 12px 6px 0 6px;
    }
    .react-datepicker__day-names,
    .react-datepicker__week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      place-items: center;
    }

    .react-datepicker__current-month {
    }
    .react-datepicker__day-names > div,
    .react-datepicker__day {
      color: ${theme.colors.gray_100};
    }

    .react-datepicker__day--today {
      color: ${theme.colors.red};
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--in-range {
      background-color: ${theme.colors.primary_800};
      border-radius: 20px;
    }
    .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
      background-color: ${theme.colors.gray_400};
      border-radius: 20px;
    }
    .react-datepicker__day--outside-month {
      color: ${theme.colors.gray_400};
      pointer-events: none;
    }
  }
`
