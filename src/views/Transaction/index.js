// @flow

import React from 'react'
import { Link } from 'react-navi'
import { mount, route } from 'navi'

import { getTransaction, parseTransactionData } from 'utils/web3'
import type { TransactionType } from 'types'
import { getBlockLink } from 'utils/routing'

export default mount({
  '/:hash': route({
    async getView(request) {
      const transaction = await getTransaction(request.params.hash)
      return <Transaction transaction={transaction} />
    },
  }),
})

export const Transaction = ({
  transaction,
}: {
  transaction: TransactionType,
}) => {
  const { etherValue } = parseTransactionData(transaction)
  return (
    <div>
      <Link href="/">back to blocks list</Link>
      <br />
      in block{' '}
      <Link href={getBlockLink(transaction.blockHash)}>
        {transaction.blockHash}
      </Link>
      <br />
      val: <span>{etherValue}</span> Ξ
      <br />
      from: <span>{transaction.from}</span>
      <br />
      to: <span>{transaction.to}</span>
    </div>
  )
}
