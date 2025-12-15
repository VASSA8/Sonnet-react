// src/components/menu/Menu.tsx
import './menu.css'

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li><a href="#">Главная</a></li>
        <li><a href="#">О нас</a></li>
        <li><a href="#">Контакты</a></li>
      </ul>
    </nav>
  )
}

// Важно: экспорт по умолчанию
export default Menu