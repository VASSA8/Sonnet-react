import Avatar from './Avatar/Avatar.tsx'

import './header.css' 

const Header = () => {
  return (
    <header className="header">
      <Avatar />
    </header>
  )
}

// Важно: экспорт по умолчанию
export default Header