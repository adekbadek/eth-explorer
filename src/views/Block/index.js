// @flow

import React from 'react'
import { Link } from 'react-navi'
import { mount, route } from 'navi'

import { getSingleBlock } from 'utils/web3'
import type { BlockType } from 'types'
import TransactionLink from 'components/TransactionLink'
import AnimatedList from 'components/AnimatedList'

export default mount({
  '/:blockHash': route({
    async getView(request) {
      const block = await getSingleBlock(request.params.blockHash)
      return <Block block={block} />
    },
  }),
})

export const Block = ({ block }: { block: BlockType }) => {
  return (
    <div>
      <Link href="/">back to blocks list</Link>
      <br />
      {block.hash}
      <br />
      {block.number}
      <br />
      <AnimatedList
        items={block.transactions.map(hash => ({ id: hash, hash }))}
        renderItem={({ hash }) => <TransactionLink hash={hash} />}
      />
    </div>
  )
}
