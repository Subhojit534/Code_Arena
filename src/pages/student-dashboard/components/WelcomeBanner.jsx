import React from 'react';

const WelcomeBanner = ({ name }) => {
    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 mb-8 text-primary-foreground relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">
                    {getTimeGreeting()}, {name}!
                </h1>
                <p className="text-primary-foreground/90 text-lg max-w-xl">
                    Ready to continue your coding streak? usage suggestions:
                    Pick up where you left off or try a new challenge to boost your rank.
                </p>
            </div>
        </div>
    );
};

export default WelcomeBanner;
