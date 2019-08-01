// @flow

import React, { useEffect, useReducer } from 'react'
import { prepend } from 'ramda'

import { getBlocks } from 'utils/web3'

const initialState = { blocks: [] }

function blocksReducer(state, action) {
  switch (action.type) {
    case 'ADD_BLOCK':
      return { blocks: prepend(action.payload, state.blocks) }
    default:
      throw new Error()
  }
}

const App = () => {
  const [state, dispatch] = useReducer(blocksReducer, initialState)

  useEffect(() => {
    const unsubscribe = getBlocks({
      initBlocksCount: 10,
      onBlockAdd: (err, newBlock) => {
        if (!err) {
          dispatch({ type: 'ADD_BLOCK', payload: newBlock })
        }
      }
    })

    return unsubscribe
  }, [])

  return (
    <div>
      <h1>blocks:</h1>
      <div>
        {state.blocks.map(block => (
          <div key={block.number}>{block.number}</div>
        ))}
      </div>
    </div>
  )
}

export default App
