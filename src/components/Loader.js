// @flow

import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoaderSpinner = styled.div`
  font-size: 50px;
  font-family: sans-serif;
  animation: ${rotate} 2s linear infinite;
`

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = () => (
  <LoaderWrapper>
    <LoaderSpinner>Ξ</LoaderSpinner>
  </LoaderWrapper>
)

export default Loader
