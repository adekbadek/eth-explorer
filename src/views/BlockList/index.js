// @flow

import React, { useEffect, useReducer } from 'react'
import { mount, route } from 'navi'
import { prepend, head } from 'ramda'
import { format } from 'date-fns'

import { getLatestBlocks } from 'utils/web3'
import { subscribeToBlocks } from 'utils/web3'
import { Heading1 } from 'components/styled'
import Table from 'components/Table'
import BlockLink from 'components/BlockLink'
import Info from 'components/Info'
import type { BlockType } from 'types'

function blocksReducer(state, action) {
  switch (action.type) {
    case 'ADD_BLOCK':
      return { blocks: prepend(action.payload, state.blocks) }
    default:
      throw new Error()
  }
}

const getDateString = timestamp =>
  `${format(new Date(timestamp * 1000), 'HH:mm:ss')}`

type Props = {
  blocks: Array<BlockType>,
}

const BlockList = ({ blocks }: Props) => {
  const [state, dispatch] = useReducer(blocksReducer, { blocks })

  useEffect(() => {
    const unsubscribe = subscribeToBlocks((err, newBlock) => {
      if (!err) {
        dispatch({ type: 'ADD_BLOCK', payload: newBlock })
      }
    })

    return unsubscribe
  }, [])

  return (
    <div>
      <Heading1 mb3 b>
        Last {state.blocks.length} blocks on Ethereum blockchain:
      </Heading1>
      <Info lastBlock={head(state.blocks)} />
      <Table
        mt4
        headers={{
          number: 'No.',
          timestamp: 'Mined at',
          hash: 'Hash',
        }}
        cellRenderers={{
          hash: block => <BlockLink hash={block.hash} />,
          timestamp: block => getDateString(block.timestamp),
        }}
        items={state.blocks.map(block => ({
          id: block.hash,
          ...block,
        }))}
      />
    </div>
  )
}

export default mount({
  '/': route({
    async getView(request) {
      const { blocks } = await getLatestBlocks()
      return <BlockList blocks={blocks} />
    },
  }),
})
