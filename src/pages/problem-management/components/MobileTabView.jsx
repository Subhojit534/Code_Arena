import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileTabView = ({ activeView, onViewChange }) => {
  const views = [
    { id: 'list', label: 'Problems', icon: 'List' },
    { id: 'editor', label: 'Editor', icon: 'Edit' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="flex items-center justify-around px-4 h-16">
        {views?.map((view) => (
          <button
            key={view?.id}
            onClick={() => onViewChange(view?.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              activeView === view?.id
                ? 'text-primary' :'text-muted-foreground'
            }`}
          >
            <Icon name={view?.icon} size={24} />
            <span className="text-xs font-medium">{view?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabView;