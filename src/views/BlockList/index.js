// @flow

import React, { useEffect, useReducer } from 'react'
import { useCurrentRoute } from 'react-navi'
import { prepend } from 'ramda'

import { subscribeToBlocks } from 'utils/web3'
import BlockLink from 'components/BlockLink'

function blocksReducer(state, action) {
  switch (action.type) {
    case 'ADD_BLOCK':
      return { blocks: prepend(action.payload, state.blocks) }
    default:
      throw new Error()
  }
}

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
      <h1>blocks:</h1>
      <div>
        {state.blocks.map(block => (
          <BlockLink key={block.number} block={block} />
        ))}
      </div>
    </div>
  )
}

export default BlockList
