import Header from '../components/header/Header.tsx'
import Menu from '../components/menu/Menu.tsx'
import BodyProjects from '../components/body/Body-Projects/Body-projects.tsx'

import '../components/header/Header.css'
import '../components/menu/menu.css'
import '../components/body/Body-home/body-home.css'
import '../index.css'

function Home() {
  return (
    <div className="app">
      {}
      <Header />
      
      {}
      <Menu />
      
      {}
      <BodyProjects />
    </div>
  )
}

export default Home