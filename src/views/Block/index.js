// @flow

import React from 'react'
import { mount, route } from 'navi'

import { getSingleBlock } from 'utils/web3'
import type { BlockType } from 'types'
import TransactionLink from 'components/TransactionLink'
import Details from 'components/Details'
import Table from 'components/Table'
import { Box } from 'components/styled'
import RootLink from 'components/RootLink'

export const Block = ({ block }: { block: BlockType }) => (
  <div>
    <RootLink />
    <Box f4 mb3 b>
      Block details:
    </Box>
    <Details
      items={{
        hash: block.hash,
        number: String(block.number),
        transactions: String(block.transactions.length),
        uncles: String(block.uncles.length),
      }}
    />
    <Box f4 mt4 b>
      Transactions:
    </Box>
    <Table
      mt3
      headers={{
        number: '#',
        id: 'hash',
      }}
      cellRenderers={{
        id: ({ id }) => <TransactionLink hash={id} />,
      }}
      items={block.transactions.map((hash, i) => ({
        number: i,
        id: hash,
      }))}
    />
  </div>
)

export default mount({
  '/:blockHash': route({
    async getView(request) {
      const block = await getSingleBlock(request.params.blockHash)
      return <Block block={block} />
    },
  }),
})
