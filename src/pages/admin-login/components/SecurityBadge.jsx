import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/10">
      <Icon name={icon} size={16} className="text-primary" />
      <span className="text-xs font-medium text-primary">{text}</span>
    </div>
  );
};

export default SecurityBadge;