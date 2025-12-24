import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileStats = ({ stats }) => {
    const statItems = [
        {
            label: 'Global Rank',
            value: stats?.rank ? `#${stats.rank}` : '-',
            icon: 'Trophy',
            color: 'text-warning',
            bgColor: 'bg-warning/10'
        },
        {
            label: 'Problems Solved',
            value: stats?.problemsSolved || 0,
            icon: 'CheckCircle',
            color: 'text-success',
            bgColor: 'bg-success/10'
        },
        {
            label: 'Current Streak',
            value: `${stats?.streak || 0} days`,
            icon: 'Flame',
            color: 'text-error',
            bgColor: 'bg-error/10'
        },
        {
            label: 'Total XP',
            value: stats?.xp || 0,
            icon: 'Zap',
            color: 'text-primary',
            bgColor: 'bg-primary/10'
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statItems.map((item, index) => (
                <div
                    key={index}
                    className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:shadow-soft transition-all duration-200"
                >
                    <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                        <Icon name={item.icon} size={24} className={item.color} />
                    </div>
                    <div>
                        <p className="text-xl lg:text-2xl font-bold text-foreground">
                            {item.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {item.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfileStats;
