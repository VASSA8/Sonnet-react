import { Link, useLocation } from 'react-router-dom';
import './menu.css';

const Menu = () => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'home', label: 'Главная', icon: '🏠', path: '/' },
    { id: 'projects', label: 'Проекты', icon: '📁', path: '/projects' },
    { id: 'portfolio', label: 'Портфолио', icon: '📊', path: '/portfolio' },
    { id: 'personal', label: 'Личное', icon: '👤', path: '/personal' },
  ];

  return (
    <nav className="menu">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`menu-button ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;