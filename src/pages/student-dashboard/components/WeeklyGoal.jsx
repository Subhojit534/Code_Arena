import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyGoal = ({ completed, target }) => {
    const percentage = Math.min((completed / target) * 100, 100);

    return (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Target" size={20} className="text-primary" />
                    Weekly Goal
                </h3>
                <span className="text-sm font-medium text-muted-foreground">
                    {completed} / {target} Problems
                </span>
            </div>

            <div className="h-4 bg-muted rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="text-sm text-muted-foreground">
                {percentage >= 100
                    ? "🎉 You've reached your weekly goal! Keep going!"
                    : `Solve ${target - completed} more problems to reach your goal.`}
            </p>
        </div>
    );
};

export default WeeklyGoal;
