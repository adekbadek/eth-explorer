// @flow

import React from 'react'
import type { Node } from 'react'
import { keys, values } from 'ramda'
import tachyonsStyled from 'tachyons-components'
import posed, { PoseGroup } from 'react-pose'

import { poseConfiguration } from 'components/AnimatedList'

const TableBase = tachyonsStyled('table')`
  f6 w-100
`

const TableHead = tachyonsStyled('thead')`
`

const TableHeader = tachyonsStyled('th')`
  fw6 bb b--black-20 tl pb2 pr3
`

const TableBody = tachyonsStyled('tbody')`
  lh-copy
`

const TableCell = tachyonsStyled('td')`
  pv1 pr3
`

type Props = {
  headers: { [string]: string },
  items: Array<{ id: string }>,
  cellRenderers: { [string]: (Object) => Node },
}

const AnimatedListItem = posed.tr(poseConfiguration)

const Table = ({ headers, items, cellRenderers, ...props }: Props) => (
  <TableBase {...props}>
    <TableHead>
      <tr>
        {values(headers).map((header, i) => (
          <TableHeader key={i}>{header}</TableHeader>
        ))}
      </tr>
    </TableHead>
    <TableBody>
      <PoseGroup animateOnMount>
        {items.map((item, i) => (
          <AnimatedListItem key={item.id} index={i}>
            {keys(headers).map(keyName => {
              const renderer =
                cellRenderers[keyName] || (() => <span>{item[keyName]}</span>)
              return <TableCell key={keyName}>{renderer(item)}</TableCell>
            })}
          </AnimatedListItem>
        ))}
      </PoseGroup>
    </TableBody>
  </TableBase>
)

export default Table
