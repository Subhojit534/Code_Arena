import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertItem = ({ type, title, message, timestamp, onDismiss }) => {
  const getAlertStyle = () => {
    switch (type) {
      case 'critical':
        return 'border-error bg-error/5';
      case 'warning':
        return 'border-warning bg-warning/5';
      case 'info':
        return 'border-primary bg-primary/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getAlertIcon = () => {
    switch (type) {
      case 'critical':
        return { name: 'AlertCircle', color: 'text-error' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'info':
        return { name: 'Info', color: 'text-primary' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const alertIcon = getAlertIcon();

  return (
    <div className={`rounded-lg border p-4 ${getAlertStyle()} transition-all duration-200`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Icon name={alertIcon?.name} size={20} className={alertIcon?.color} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{message}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="flex-shrink-0"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AlertItem;