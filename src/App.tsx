import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/menu/Menu';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Personal from './pages/Personal';
import AuthGuard from './components/auth/AuthGuard';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Публичный маршрут для логина */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Защищенные маршруты */}
          <Route path="/" element={
            <AuthGuard>
              <div className="app-content">
                <main className="content">
                  <Home />
                </main>
                <Menu />
              </div>
            </AuthGuard>
          } />
          
          <Route path="/projects" element={
            <AuthGuard>
              <div className="app-content">
                <main className="content">
                  <Projects />
                </main>
                <Menu />
              </div>
            </AuthGuard>
          } />
          
          <Route path="/portfolio" element={
            <AuthGuard>
              <div className="app-content">
                <main className="content">
                  <Portfolio />
                </main>
                <Menu />
              </div>
            </AuthGuard>
          } />
          
          <Route path="/personal" element={
            <AuthGuard>
              <div className="app-content">
                <main className="content">
                  <Personal />
                </main>
                <Menu />
              </div>
            </AuthGuard>
          } />
          
          {/* Редирект с любого несуществующего маршрута */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;