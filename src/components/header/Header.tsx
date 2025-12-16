import Avatar from './Avatar/Avatar.tsx'
import Balance from './balance/Balance.tsx'

import './header.css' 

const Header = () => {
  return (
    <header className="header">
      <Avatar />
      <Balance />
    </header>
  )
}

export default Header