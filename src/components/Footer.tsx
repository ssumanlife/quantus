import { theme } from '@/styles/theme'
import { css } from '@emotion/react'
import { BiSolidMessageRounded } from 'react-icons/bi'
import { IoMail } from 'react-icons/io5'
const Footer = () => {
  return (
    <footer css={container}>
      <div css={wrapper}>
        <div css={menuWrapper}>
          <div css={menu}>
            <h1>Quantus</h1>
            <p>
              주식회사 퀀터스테크놀로지스 <span>|</span> 대표자명 이재민
            </p>
            <ul>
              <li>서울특별시 강남구 선릉로 93길 54, 6층 6062호 (역삼동, 일환빌딩)</li>
              <li>사업자등록번호 245-88-02569 | 통신판매신고 제2024-서울강남-05978호</li>
              <li>비즈니스 관련 문의 info@quantus.kr</li>
            </ul>
          </div>
          <div css={menu}>
            <h5>고객센터</h5>
            <span>평일 10:00 -17:00 (주말 및 공휴일 휴무)</span>
            <ul>
              <li>
                <BiSolidMessageRounded size={18} fill={theme.colors.gray_300} />
                카카오톡 상담하기
              </li>
              <li>
                <IoMail size={18} fill={theme.colors.gray_300} />
                cs@quantus.kr
              </li>
            </ul>
          </div>
          <div css={menu}>
            <h5>회사</h5>
            <ul>
              <li>회사 소개</li>
              <li>알파파인더</li>
              <li>채용</li>
            </ul>
          </div>
          <div css={menu}>
            <h5>안내</h5>
            <ul>
              <li>개인정보처리방침</li>
              <li>이용약관</li>
            </ul>
          </div>
        </div>
        <span>© 2023 Quantus Technologies. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer

const container = css`
  background-color: ${theme.colors.black};
  * {
    color: ${theme.colors.gray_100};
  }
`

const wrapper = css`
  width: ${theme.width.base};
  margin: 0 auto;
  padding: 58px 0;
  display: flex;
  flex-direction: column;
  gap: 70px;
  span,
  li {
    color: ${theme.colors.gray_300};
    font-size: ${theme.fontSizes.b1};
  }
`

const menuWrapper = css`
  display: flex;
  justify-content: space-between;
`

const menu = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    li {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
`
