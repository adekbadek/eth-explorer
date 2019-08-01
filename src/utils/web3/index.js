// @flow

import Web3 from 'web3'
import { times } from 'ramda'

import type { BlockType } from 'types'

export const web3 = new Web3(Web3.givenProvider)

type GetBlocksConfigType = {
  initBlocksCount: number,
  onBlockAdd: (Error, BlockType) => void
}

export const getBlocks = ({
  initBlocksCount,
  onBlockAdd
}: GetBlocksConfigType): (() => void) => {
  async function getLatestBlocks() {
    const latestBlock = await web3.eth.getBlock('latest')

    const batch = new web3.BatchRequest()

    times(i => {
      const blockNumber = latestBlock.number + 1 - initBlocksCount + i
      batch.add(web3.eth.getBlock.request(blockNumber, onBlockAdd))
    }, initBlocksCount)

    batch.execute()
  }

  getLatestBlocks()

  const subscription = web3.eth.subscribe('newBlockHeaders', onBlockAdd)

  return subscription.unsubscribe.bind(subscription)
}
