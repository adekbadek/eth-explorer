// @flow

import React from 'react'
import { Link } from 'react-navi'

import type { HashType } from 'types'
import { getBlockLink } from 'utils/routing'
import { HashLink } from 'components/styled'

const BlockLink = ({ hash }: { hash: HashType }) => (
  <Link href={getBlockLink(hash)}>
    <HashLink>{hash}</HashLink>
  </Link>
)

export default BlockLink
