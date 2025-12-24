import React from 'react';
import SecurityBadge from './SecurityBadge';

const SecurityFeatures = () => {
  const features = [
    { icon: 'Lock', text: 'SSL Encrypted' },
    { icon: 'Shield', text: 'Two-Factor Auth' },
    { icon: 'Eye', text: 'Activity Monitoring' },
    { icon: 'Clock', text: 'Session Timeout' }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {features?.map((feature, index) => (
        <SecurityBadge key={index} icon={feature?.icon} text={feature?.text} />
      ))}
    </div>
  );
};

export default SecurityFeatures;