// @flow

import React, { useEffect, useState } from 'react'

import { getNetworkName } from 'utils/web3'
import Details from 'components/Details'

const CurrentNetwork = () => {
  const [network, setNetName] = useState('')

  useEffect(() => {
    getNetworkName().then(setNetName)
  }, [])

  return <Details mb3 items={{ network }} />
}

export default CurrentNetwork
