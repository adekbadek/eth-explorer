// @flow

import React from 'react'
import { lazy, mount } from 'navi'
import { Router } from 'react-navi'

import Layout from 'components/Layout'
import { GlobalStyle } from 'components/styled'

const routes = mount({
  '/': lazy(() => import('views/BlockList')),
  '/block': lazy(() => import('views/Block')),
  '/txn': lazy(() => import('views/Transaction')),
})

const App = () => (
  <>
    <GlobalStyle />
    <Router routes={routes}>
      <Layout />
    </Router>
  </>
)

export default App
