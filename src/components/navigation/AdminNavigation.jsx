import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminNavigation = ({ onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location?.pathname === path;

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Platform overview and analytics'
    },
    {
      label: 'Problems',
      path: '/problem-management',
      icon: 'Code',
      tooltip: 'Manage coding problems and content'
    },
    {
      label: 'Test Cases',
      path: '/test-case-management',
      icon: 'FileCheck',
      tooltip: 'Configure test cases and validation'
    },
    {
      label: 'Leaderboard',
      path: '/admin/leaderboard',
      icon: 'Trophy',
      tooltip: 'View student rankings'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="admin-navigation">
        <div className="admin-navigation-logo">
          <div className="admin-navigation-brand">
            <Icon name="Shield" size={24} className="admin-navigation-brand-icon" />
          </div>
          <span className="admin-navigation-title">CodeArena Admin</span>
        </div>

        <div className="admin-navigation-menu">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`admin-navigation-item ${isActive(item?.path) ? 'active' : ''}`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}

          <button
            onClick={onLogout}
            className="admin-navigation-item"
            title="Sign out"
          >
            <Icon name="LogOut" size={18} />
            <span>Logout</span>
          </button>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="admin-navigation-mobile-toggle"
          aria-label="Toggle menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="admin-navigation-mobile-menu animation-fade-in">
          <div className="admin-navigation-mobile-header">
            <div className="flex items-center gap-3">
              <div className="admin-navigation-brand">
                <Icon name="Shield" size={24} className="admin-navigation-brand-icon" />
              </div>
              <span className="admin-navigation-title">CodeArena Admin</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              aria-label="Close menu"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="admin-navigation-mobile-items">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={handleMobileItemClick}
                className={`admin-navigation-mobile-item ${isActive(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}

            <button
              onClick={() => {
                handleMobileItemClick();
                onLogout();
              }}
              className="admin-navigation-mobile-item w-full text-left"
            >
              <Icon name="LogOut" size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavigation;