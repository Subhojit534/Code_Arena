import React from 'react';

const ActivityHeatmap = ({ activityData }) => {
    // Generate mock data for the last 365 days if not provided
    const generateMockData = () => {
        const data = [];
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Random activity level 0-4
            // Bias towards 0 to make it look realistic
            const rand = Math.random();
            let level = 0;
            if (rand > 0.9) level = 4;
            else if (rand > 0.8) level = 3;
            else if (rand > 0.6) level = 2;
            else if (rand > 0.4) level = 1;

            data.push({
                date: date.toISOString().split('T')[0],
                level,
                count: level * Math.floor(Math.random() * 5 + 1)
            });
        }
        return data;
    };

    const data = activityData || generateMockData();
    const weeks = [];

    // Group by weeks
    for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
    }

    const getLevelColor = (level) => {
        switch (level) {
            case 1: return 'bg-primary/20';
            case 2: return 'bg-primary/40';
            case 3: return 'bg-primary/60';
            case 4: return 'bg-primary';
            default: return 'bg-muted/50';
        }
    };

    return (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Activity</h2>
            <div className="overflow-x-auto pb-2">
                <div className="flex gap-1 min-w-max">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((day, dayIndex) => (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)}`}
                                    title={`${day.date}: ${day.count} contributions`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-muted/50" />
                    <div className="w-3 h-3 rounded-sm bg-primary/20" />
                    <div className="w-3 h-3 rounded-sm bg-primary/40" />
                    <div className="w-3 h-3 rounded-sm bg-primary/60" />
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
};

export default ActivityHeatmap;
