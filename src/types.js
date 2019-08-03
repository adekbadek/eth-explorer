// @flow

export type HashType = string

export type BlockNumberType = number

export type BlockType = {
  number: BlockNumberType,
  hash: HashType,
  transactions: Array<HashType>,
  timestamp: number,
  uncles: Array<HashType>,
}

export type TransactionType = {
  hash: HashType,
  blockHash: HashType,
  value: string,
  from: HashType,
  to: HashType,
}
