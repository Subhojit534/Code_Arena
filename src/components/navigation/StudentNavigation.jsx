import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const StudentNavigation = ({ onLogout }) => {
    const location = useLocation();

    const isActive = (path) => location?.pathname === path;

    const navigationItems = [
        {
            label: 'Practice',
            path: '/coding-interface',
            icon: 'Code2',
            tooltip: 'Start coding practice'
        },
        {
            label: 'Profile',
            path: '/student-profile',
            icon: 'User',
            tooltip: 'View your progress'
        }
    ];

    return (
        <>
            <nav className="student-navigation">
                <div className="student-navigation-logo">
                    <div className="student-navigation-brand">
                        <Icon name="Code2" size={24} className="student-navigation-brand-icon" />
                    </div>
                    <span className="student-navigation-title">CodeArena</span>
                </div>

                <div className="student-navigation-menu">
                    {navigationItems?.map((item) => (
                        <Link
                            key={item?.path}
                            to={item?.path}
                            className={`student-navigation-item ${isActive(item?.path) ? 'active' : ''}`}
                            title={item?.tooltip}
                        >
                            <Icon name={item?.icon} size={18} />
                            <span>{item?.label}</span>
                        </Link>
                    ))}

                    <button
                        onClick={onLogout}
                        className="student-navigation-item"
                        title="Sign out"
                    >
                        <Icon name="LogOut" size={18} />
                        <span>Logout</span>
                    </button>
                </div>

                <div className="flex items-center gap-4 lg:hidden">
                    <button
                        onClick={onLogout}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                        title="Sign out"
                    >
                        <Icon name="LogOut" size={20} />
                    </button>
                </div>
            </nav>
        </>
    );
};

export default StudentNavigation;