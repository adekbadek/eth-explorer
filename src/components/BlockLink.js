// @flow

import React from 'react'
import { Link } from 'react-navi'

import type { BlockType } from 'types'
import { getBlockLink } from 'utils/routing'

const BlockLink = ({ block }: { block: BlockType }) => (
  <div>
    {block.number} <Link href={getBlockLink(block.hash)}>{block.hash}</Link>
  </div>
)

export default BlockLink
