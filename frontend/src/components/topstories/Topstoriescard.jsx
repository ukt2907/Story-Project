import React from 'react'
import '../topstories/topStories.css'

const StoryCard = ({heading, description}) => {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>

  )
}

export default StoryCard


