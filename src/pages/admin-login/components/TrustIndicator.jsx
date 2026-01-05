import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: 'CheckCircle2',
      text: 'Enterprise-grade security protocols'
    },
    {
      icon: 'Database',
      text: 'Encrypted data storage and transmission'
    },
    {
      icon: 'Users',
      text: 'Role-based access control system'
    }
  ];

  return (
    <div className="space-y-3">
      {indicators?.map((indicator, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
            <Icon name={indicator?.icon} size={12} className="text-success" />
          </div>
          <p className="text-sm text-muted-foreground">{indicator?.text}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;