// @flow

import React, { Suspense } from 'react'
import BusyIndicator from 'react-busy-indicator'
import { View, NotFoundBoundary, useLoadingRoute } from 'react-navi'

import NotFoundRoute from 'views/NotFound'

const Layout = () => {
  const loadingRoute = useLoadingRoute()
  return (
    <>
      <BusyIndicator isBusy={!!loadingRoute} delayMs={100} />
      <NotFoundBoundary render={NotFoundRoute}>
        <Suspense fallback="lodin">
          <View />
        </Suspense>
      </NotFoundBoundary>
    </>
  )
}

export default Layout
