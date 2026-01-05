import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceWidget = ({ title, status, value, unit, icon, lastUpdated }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'healthy':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'critical':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle2';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 transition-all duration-200 hover:shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={18} className="text-muted-foreground" />
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge()} flex items-center gap-1`}>
          <Icon name={getStatusIcon()} size={12} />
          {status}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-2xl font-bold ${getStatusColor()}`}>{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <p className="text-xs text-muted-foreground">Updated {lastUpdated}</p>
    </div>
  );
};

export default PerformanceWidget;