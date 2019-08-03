// @flow

import React, { useEffect, useReducer } from 'react'
import { useCurrentRoute } from 'react-navi'
import { prepend } from 'ramda'
import { format } from 'date-fns'

import { subscribeToBlocks } from 'utils/web3'
import { Heading1 } from 'components/styled'
import Table from 'components/Table'
import BlockLink from 'components/BlockLink'
import CurrentNetwork from 'components/CurrentNetwork'

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

const BlockList = () => {
  const { data } = useCurrentRoute()

  const [state, dispatch] = useReducer(blocksReducer, data)

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
      <CurrentNetwork />
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

export default BlockList
