// @flow

import React from 'react'
import { lazy, mount, route } from 'navi'
import { Router } from 'react-navi'

import { getLatestBlocks } from 'utils/web3'
import BlockList from 'views/BlockList'
import Layout from 'components/Layout'
import { GlobalStyle } from 'components/styled'

const routes = mount({
  '/': route({
    getData: () => getLatestBlocks(),
    view: <BlockList />,
  }),
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
