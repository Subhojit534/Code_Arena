import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeedItem = ({ type, user, action, problem, timestamp, status }) => {
  const getActivityIcon = () => {
    switch (type) {
      case 'submission':
        return 'Code2';
      case 'registration':
        return 'UserPlus';
      case 'achievement':
        return 'Award';
      default:
        return 'Activity';
    }
  };

  const getStatusColor = () => {
    if (status === 'success') return 'text-success';
    if (status === 'failed') return 'text-error';
    return 'text-muted-foreground';
  };

  const getStatusBadge = () => {
    if (status === 'success') return 'bg-success/10 text-success';
    if (status === 'failed') return 'bg-error/10 text-error';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon name={getActivityIcon()} size={20} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm text-foreground">
            <span className="font-medium">{user}</span> {action}
            {problem && <span className="font-medium"> {problem}</span>}
          </p>
          {status && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge()} flex-shrink-0`}>
              {status}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityFeedItem;