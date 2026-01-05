import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'submission': return 'Code2';
            case 'achievement': return 'Trophy';
            case 'contest': return 'Swords';
            default: return 'Activity';
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case 'submission': return 'text-primary';
            case 'achievement': return 'text-warning';
            case 'contest': return 'text-destructive';
            default: return 'text-muted-foreground';
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'submission': return 'bg-primary/10';
            case 'achievement': return 'bg-warning/10';
            case 'contest': return 'bg-destructive/10';
            default: return 'bg-muted';
        }
    };

    return (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-6">
                {activities?.map((activity, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="relative">
                            <div className={`w-10 h-10 rounded-full ${getBgColor(activity.type)} flex items-center justify-center shrink-0 z-10 relative`}>
                                <Icon name={getIcon(activity.type)} size={20} className={getIconColor(activity.type)} />
                            </div>
                            {index !== activities.length - 1 && (
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-full bg-border -z-0" />
                            )}
                        </div>
                        <div className="pb-1">
                            <p className="text-sm font-medium text-foreground">
                                {activity.title}
                            </p>
                            <p className="text-sm text-muted-foreground mb-1">
                                {activity.description}
                            </p>
                            <span className="text-xs text-muted-foreground">
                                {activity.timestamp}
                            </span>
                        </div>
                    </div>
                ))}

                {(!activities || activities.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                        No recent activity
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
