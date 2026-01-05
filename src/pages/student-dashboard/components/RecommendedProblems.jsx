import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedProblems = ({ problems }) => {
    const navigate = useNavigate();

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-success bg-success/10';
            case 'medium': return 'text-warning bg-warning/10';
            case 'hard': return 'text-error bg-error/10';
            default: return 'text-muted-foreground bg-muted';
        }
    };

    return (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Sparkles" size={20} className="text-warning" />
                    Recommended for You
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/coding-interface')}
                >
                    View All
                </Button>
            </div>

            <div className="space-y-4">
                {problems.map((problem) => (
                    <div
                        key={problem.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group cursor-pointer"
                        onClick={() => navigate(`/coding-interface?problem=${problem.id}`)}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`px-2.5 py-1 rounded text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    {problem.title}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {problem.category} • {problem.acceptanceRate}% Acceptance
                                </span>
                            </div>
                        </div>
                        <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProblems;
