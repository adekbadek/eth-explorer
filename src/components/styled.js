// @flow

import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import tachyonsStyled from 'tachyons-components'

export const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: 'Overpass', sans-serif;
    color: #111111;
    background-color: #ffffff;
  }
  a {
    text-decoration: none;
    color: #0040ff;
  }
`

export const Box = tachyonsStyled('div')``

export const Heading1 = tachyonsStyled('h1')`
  f3
`

export const HashLink = tachyonsStyled('code')`
  courier
`
