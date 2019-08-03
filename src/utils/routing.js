// @flow

import type { HashType } from 'types'

export const getBlockLink = (hash: HashType) => `/block/${hash}`
export const getTransactionLink = (hash: HashType) => `/txn/${hash}`
