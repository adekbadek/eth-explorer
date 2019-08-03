// @flow

import React from 'react'
import { Link } from 'react-navi'

import type { HashType } from 'types'
import { getTransactionLink } from 'utils/routing'
import { HashLink } from 'components/styled'

const TransactionLink = ({ hash }: { hash: HashType }) => (
  <Link href={getTransactionLink(hash)}>
    <HashLink>{hash}</HashLink>
  </Link>
)

export default TransactionLink
