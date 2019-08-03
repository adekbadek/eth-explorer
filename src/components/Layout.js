// @flow

import React, { Suspense } from 'react'
import BusyIndicator from 'react-busy-indicator'
import { View, NotFoundBoundary, useLoadingRoute } from 'react-navi'
import posed from 'react-pose'

import NotFound from 'views/NotFound'
import NoProvider from 'views/NoProvider'
import Loader from 'components/Loader'
import { Box } from 'components/styled'
import { hasProvider } from 'utils/web3'

const AnimatedViewWrapper = posed.div({
  hidden: { opacity: 0, transition: { duration: 200 } },
  visible: { opacity: 1, transition: { duration: 200 } },
})

const Layout = () => {
  const loadingRoute = useLoadingRoute()
  if (!hasProvider()) {
    return <NoProvider />
  }
  return (
    <>
      <BusyIndicator isBusy={!!loadingRoute} delayMs={100} />
      <NotFoundBoundary render={NotFound}>
        <Suspense fallback={<Loader />}>
          <AnimatedViewWrapper pose={loadingRoute ? 'hidden' : 'visible'}>
            <Box pa4 mw8 center>
              <View />
            </Box>
          </AnimatedViewWrapper>
        </Suspense>
      </NotFoundBoundary>
    </>
  )
}

export default Layout
