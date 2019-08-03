// @flow

import React from 'react'
import { Link } from 'react-navi'

import type { HashType } from 'types'
import { getTransactionLink } from 'utils/routing'

const TransactionLink = ({ hash }: { hash: HashType }) => (
  <div>
    <Link href={getTransactionLink(hash)}>{hash}</Link>
  </div>
)

export default TransactionLink
