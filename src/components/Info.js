// @flow

import React, { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import { getNetworkName } from 'utils/web3'
import Details from 'components/Details'
import type { BlockType } from 'types'

type Props = {
  lastBlock: BlockType,
}

const getSecondsSince = timestamp => differenceInSeconds(new Date(), timestamp)

const Info = ({ lastBlock }: Props) => {
  const lastBlockTime = lastBlock.timestamp * 1000

  const [network, setNetName] = useState('')
  const [timeSinceLast, setTimeSinceLast] = useState(
    getSecondsSince(lastBlockTime)
  )

  useEffect(() => {
    getNetworkName().then(setNetName)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceLast(getSecondsSince(lastBlockTime))
    }, 1000)

    return () => clearInterval(interval)
  }, [lastBlockTime])

  return (
    <Details mb3 items={{ network, 'since last block': `${timeSinceLast}s` }} />
  )
}

export default Info
