import Header from '../components/header/Header.tsx'
import Menu from '../components/menu/Menu.tsx'
import BodyHome from '../components/body/Body-home/Body-home.tsx'

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
      <BodyHome />
    </div>
  )
}

export default Home