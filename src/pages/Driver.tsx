import { Steps } from 'antd';
import React from 'react'

export default function Driver() {
    const items= [
        {
          title: 'Finished',
          description:"Finished",
        },
        {
          title: 'In Progress',
          description:"in transit ",
        },
        {
          title: 'Waiting',
          description:"waiting ",
        },
      ];
  return (
  <>
    <div>Driver</div>

<Steps
direction="vertical"
current={2}
items={items}
/></>
  )
}
