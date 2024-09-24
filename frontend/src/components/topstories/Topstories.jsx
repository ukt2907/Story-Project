import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Storycard from './Topstoriescard'
import H1 from '../../../utils/H1'
import { useNavigate } from "react-router-dom";

const Topstories = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/story')
        setData(response.data)
      } catch (error) {
        setError(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <H1 title={data.length > 0 ? data[0].heading : ''} />
          {data.map((item, index) => (
            <Storycard key={index} heading={item.heading} description={item.description} />
          ))}
        </>
      )}
    </>
  )
}

export default Topstories