// @flow

import React from 'react'
import type { Node } from 'react'
import posed, { PoseGroup } from 'react-pose'

type Props = { items: Array<{ id: string }>, renderItem: Object => Node }

export const poseConfiguration = {
  enter: {
    y: 0,
    opacity: 1,
    delay: ({ index }: { index: number }) => index * 50,
  },
  exit: { y: 20, opacity: 0 },
}

const AnimatedListItem = posed.div(poseConfiguration)

const AnimatedList = ({ items, renderItem }: Props) => (
  <PoseGroup animateOnMount>
    {items.map((item, i) => (
      <AnimatedListItem key={item.id} index={i}>
        {renderItem(item)}
      </AnimatedListItem>
    ))}
  </PoseGroup>
)

export default AnimatedList
