import './Navbar.css';

function Navbar({ activeView, onViewChange }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-brand-icon">📊</div>
        <span>SQL Data Visualization Dashboard</span>
      </div>
      <ul className="navbar-menu">
        <li>
          <a 
            href="#" 
            className={activeView === 'dashboard' ? 'active' : ''} 
            onClick={(e) => { 
              e.preventDefault(); 
              onViewChange('dashboard'); 
            }}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className={activeView === 'students' ? 'active' : ''} 
            onClick={(e) => { 
              e.preventDefault(); 
              onViewChange('students'); 
            }}
          >
            Students
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
