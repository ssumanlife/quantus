import { Global, css } from '@emotion/react'
import { theme } from './theme'

const baseStyle = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset {
    border: none;
  }
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    display: flex;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: ${theme.colors.black_100};
    color: ${theme.colors.white};
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    margin: 0 auto;
  }

  input {
    border: none;
    outline: none;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      display: none;
    }
  }

  button {
    cursor: pointer;
    border: none;
  }

  h1 {
    font-size: ${theme.fontSizes.h1};
    font-weight: ${theme.fontWeights.bold};
  }

  h2 {
    font-size: ${theme.fontSizes.h2};
    font-weight: ${theme.fontWeights.bold};
  }

  h3 {
    font-size: ${theme.fontSizes.h3};
    font-weight: ${theme.fontWeights.semiBold};
  }

  h4 {
    font-size: ${theme.fontSizes.h4};
    font-weight: ${theme.fontWeights.normal};
  }

  h5 {
    font-size: ${theme.fontSizes.h5};
    font-weight: ${theme.fontWeights.normal};
  }
`

const GlobalStyle: React.FC = () => <Global styles={baseStyle} />

export default GlobalStyle
