import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionTile = ({ title, description, icon, iconColor, path, badge }) => {
  return (
    <Link
      to={path}
      className="bg-card rounded-lg border border-border p-6 transition-all duration-200 hover:shadow-elevated hover:border-primary group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${iconColor} transition-transform duration-200 group-hover:scale-110`}>
          <Icon name={icon} size={28} className="text-white" />
        </div>
        {badge && (
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <span>Open</span>
        <Icon name="ArrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default QuickActionTile;