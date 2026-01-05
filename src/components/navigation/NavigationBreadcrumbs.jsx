import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = () => {
  const location = useLocation();
  
  const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
  
  const breadcrumbMap = {
    'admin-dashboard': 'Dashboard',
    'problem-management': 'Problems',
    'test-case-management': 'Test Cases',
    'coding-interface': 'Practice',
    'student-profile': 'Profile'
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = [{ label: 'Home', path: '/' }];
    
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = breadcrumbMap?.[segment] || segment?.split('-')?.map(word => 
        word?.charAt(0)?.toUpperCase() + word?.slice(1)
      )?.join(' ');
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="navigation-breadcrumbs" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <div key={crumb?.path} className="breadcrumb-item">
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="breadcrumb-separator" />
          )}
          {crumb?.isLast ? (
            <span className="breadcrumb-current" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <Link to={crumb?.path} className="breadcrumb-link">
              {crumb?.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavigationBreadcrumbs;