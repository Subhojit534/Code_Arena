import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileTabView = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'problem', label: 'Problem', icon: 'FileText' },
    { id: 'editor', label: 'Editor', icon: 'Code2' },
    { id: 'output', label: 'Output', icon: 'Terminal' }
  ];

  return (
    <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-card border-b border-border">
      <div className="flex">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabView;