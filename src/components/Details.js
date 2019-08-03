// @flow

import React from 'react'
import type { Node } from 'react'
import { mapObjIndexed, values } from 'ramda'

import { Box } from 'components/styled'

const Details = ({
  items,
  ...props
}: {
  items: { [string]: string | (() => Node) },
}) => (
  <Box {...props}>
    {values(
      mapObjIndexed(
        (value, key) => (
          <Box key={key} f6 lh-title mv2>
            <Box dib b>
              {key}:
            </Box>{' '}
            <Box dib ml0 gray courier>
              {typeof value === 'function' ? value() : value}
            </Box>
          </Box>
        ),
        items
      )
    )}
  </Box>
)

export default Details
