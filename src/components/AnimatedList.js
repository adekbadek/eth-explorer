// @flow

import React from 'react'
import type { Node } from 'react'
import posed, { PoseGroup } from 'react-pose'

type Props = { items: Array<{ id: string }>, renderItem: Object => Node }

const AnimatedListItem = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: ({ index }) => index * 50,
  },
  exit: { y: 20, opacity: 0 },
})

const AnimatedList = ({ items, renderItem }: Props) => (
  <div>
    <PoseGroup animateOnMount>
      {items.map((item, i) => (
        <AnimatedListItem key={item.id} index={i}>
          {renderItem(item)}
        </AnimatedListItem>
      ))}
    </PoseGroup>
  </div>
)

export default AnimatedList
