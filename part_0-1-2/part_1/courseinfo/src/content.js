import React from 'react'
import Part from './part'

function Content ({ parts }) {
  return (
    <div>
      {parts.map((part, i) => {
        return <Part name={part.name} exercises={part.exercises} key={`part_${i}`}/>
      })}
    </div>
  )
}

export default Content
