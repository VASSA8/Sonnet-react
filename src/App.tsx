import Header from './components/header/Header.tsx'
import Menu from './components/menu/Menu.tsx'

import './components/header/Header.css'
import './components/menu/menu.css'
import './index.css'

function App() {
  return (
    <div className="app">
      {}
      <Header />
      
      {}
      <Menu />
      
      {}
      <main>
        <h1>Добро пожаловать в Sonnet-React!</h1>
        <p>Ваше приложение готово к работе.</p>
      </main>
    </div>
  )
}

export default App