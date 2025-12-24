import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlight = () => {
  const features = [
    {
      icon: 'Code2',
      title: 'Multi-Language Support',
      description: 'Practice in C, C++, Python, Java, Go, and Rust with professional code editor'
    },
    {
      icon: 'Target',
      title: 'Real-Time Evaluation',
      description: 'Instant feedback with automated test case execution and detailed results'
    },
    {
      icon: 'TrendingUp',
      title: 'Track Your Progress',
      description: 'Comprehensive analytics, achievement badges, and performance insights'
    },
    {
      icon: 'Award',
      title: 'Competitive Edge',
      description: 'Difficulty-wise analysis and language proficiency metrics for growth'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Why Choose CodeArena?
        </h2>
        <p className="text-muted-foreground">
          Join thousands of developers improving their coding skills through structured practice and real-time feedback
        </p>
      </div>
      <div className="grid gap-4">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 group"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name={feature?.icon} size={24} className="text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-primary" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Start Your Journey Today
            </h4>
            <p className="text-sm text-muted-foreground">
              Create your free account and get instant access to hundreds of coding problems, comprehensive analytics, and a supportive learning environment designed for your success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight;