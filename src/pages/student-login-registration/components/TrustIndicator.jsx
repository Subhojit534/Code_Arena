import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const stats = [
    { value: '50K+', label: 'Active Students', icon: 'Users' },
    { value: '1000+', label: 'Coding Problems', icon: 'Code' },
    { value: '98%', label: 'Success Rate', icon: 'TrendingUp' }
  ];

  const trustBadges = [
    { icon: 'Shield', label: 'SSL Secured' },
    { icon: 'Lock', label: 'Data Protected' },
    { icon: 'Award', label: 'Certified Platform' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="text-center p-4 rounded-xl bg-card border border-border"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
              <Icon name={stat?.icon} size={20} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 py-4">
        {trustBadges?.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Icon name={badge?.icon} size={16} className="text-success" />
            <span>{badge?.label}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-muted-foreground">
        <p>© {new Date()?.getFullYear()} CodeArena. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <button className="hover:text-foreground transition-colors">
            Privacy Policy
          </button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">
            Terms of Service
          </button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;