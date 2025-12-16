import Header from '../components/header/Header.tsx'
import Menu from '../components/menu/Menu.tsx'
import BodyPortfolio from '../components/body/Body-Portfolio/Body-portfolio.tsx'

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
      <BodyPortfolio/>
    </div>
  )
}

export default Home