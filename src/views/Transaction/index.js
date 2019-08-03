// @flow

import React from 'react'
import { mount, route } from 'navi'

import { getTransaction, parseTransactionData } from 'utils/web3'
import type { TransactionType } from 'types'
import { Box } from 'components/styled'
import Details from 'components/Details'
import BlockLink from 'components/BlockLink'
import RootLink from 'components/RootLink'

export const Transaction = ({
  transaction,
}: {
  transaction: TransactionType,
}) => {
  const { etherValue } = parseTransactionData(transaction)
  return (
    <div>
      <RootLink />
      <Box f4 mb3 b>
        Transaction details:
      </Box>
      <Details
        items={{
          block: () => <BlockLink hash={transaction.blockHash} />,
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          value: `${etherValue} ETH`,
        }}
      />
    </div>
  )
}

export default mount({
  '/:hash': route({
    async getView(request) {
      const transaction = await getTransaction(request.params.hash)
      return <Transaction transaction={transaction} />
    },
  }),
})
