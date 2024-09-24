import Nav from '../components/navs/Nav'
import Stories from '../components/category/Stories'
import Topstories from '../components/topstories/Topstories'

const Homepage = () => {
  return (
    <div className='homepage'>
      <Nav />
      {/* <Stories /> */}
      <Topstories />
    </div>
  )
}

export default Homepage
