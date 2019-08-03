// @flow

import React, { Suspense } from 'react'
import BusyIndicator from 'react-busy-indicator'
import { View, NotFoundBoundary, useLoadingRoute } from 'react-navi'
import posed from 'react-pose'

import NotFoundRoute from 'views/NotFound'
import Loader from 'components/Loader'

const AnimatedViewWrapper = posed.div({
  hidden: { opacity: 0, transition: { duration: 200 } },
  visible: { opacity: 1, transition: { duration: 200 } },
})

const Layout = () => {
  const loadingRoute = useLoadingRoute()
  return (
    <>
      <BusyIndicator isBusy={!!loadingRoute} delayMs={100} />
      <NotFoundBoundary render={NotFoundRoute}>
        <Suspense fallback={<Loader />}>
          <AnimatedViewWrapper pose={loadingRoute ? 'hidden' : 'visible'}>
            <View />
          </AnimatedViewWrapper>
        </Suspense>
      </NotFoundBoundary>
    </>
  )
}

export default Layout
