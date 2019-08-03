// @flow

import Web3 from 'web3'
import { reverse, times, sortBy, prop } from 'ramda'

import type {
  BlockType,
  BlockNumberType,
  HashType,
  TransactionType,
} from 'types'
import PROVIDER from './provider'

export const web3 = new Web3(PROVIDER)

export const hasProvider = () => PROVIDER !== null

const sortBlocksByNumber = sortBy<BlockType, BlockNumberType>(prop('number'))

export const getLatestBlocks = async (blocksCount: number = 20) => {
  const latestBlock = await web3.eth.getBlock('latest')

  // NOTE: web3.BatchRequest() could be used when v2 of web3 is released.
  // Until then, batch.execute() does not return a Promise.

  const getBlockRequests = times(
    i => web3.eth.getBlock(latestBlock.number - i),
    blocksCount
  )

  return Promise.all(getBlockRequests).then(blocks => ({
    blocks: reverse(sortBlocksByNumber(blocks)),
  }))
}

export const getSingleBlock = (hash: HashType) => web3.eth.getBlock(hash)
export const getTransaction = (hash: HashType) => web3.eth.getTransaction(hash)

export const subscribeToBlocks = (
  onBlockAdd: (Error, BlockType) => void
): (() => void) => {
  const subscription = web3.eth.subscribe('newBlockHeaders', onBlockAdd)

  return subscription.unsubscribe.bind(subscription)
}

export const parseTransactionData = (txn: TransactionType) => ({
  etherValue: web3.utils.fromWei(txn.value),
})

const NETWORKS = {
  '1': 'Mainnet',
  '2': 'Morden',
  '3': 'Ropsten',
  '4': 'Rinkeby',
  '5': 'Goerli',
  '42': 'Kovan',
}

export const getNetworkName = async (): Promise<string> => {
  const netId = await web3.eth.net.getId()
  return NETWORKS[netId] || ''
}
