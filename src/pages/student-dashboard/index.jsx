import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StudentNavigation from '../../components/navigation/StudentNavigation';
import WelcomeBanner from './components/WelcomeBanner';
import WeeklyGoal from './components/WeeklyGoal';
import RecommendedProblems from './components/RecommendedProblems';
import RecentActivity from '../student-profile/components/RecentActivity';
import Icon from '../../components/AppIcon';

const StudentDashboard = () => {
    // Mock Data
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentActivities, setRecentActivities] = useState([]);

    const [recommended] = useState([
        { id: 101, title: 'Valid Palindrome', difficulty: 'Easy', category: 'Strings', acceptanceRate: 68 },
        { id: 102, title: 'Container With Most Water', difficulty: 'Medium', category: 'Arrays', acceptanceRate: 54 },
        { id: 103, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Dynamic Programming', acceptanceRate: 42 },
    ]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/user/dashboard');
                const userData = response.data;
                setUser(userData);
                setRecentActivities(userData.recentActivity || []);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;
    }

    if (!user) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Failed to load user data</div>;
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            <StudentNavigation onLogout={() => window.location.href = '/student-login-registration'} />

            <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <WelcomeBanner name={user.name} />

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <WeeklyGoal completed={user.weeklyProgress.completed} target={user.weeklyProgress.target} />

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Icon name="BookOpen" size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Resume Learning</h3>
                                        <p className="text-xs text-muted-foreground">Continue where you left off</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50 border border-border mb-4">
                                    <p className="font-medium text-foreground mb-1">Introduction to Graphs</p>
                                    <p className="text-xs text-muted-foreground">Last accessed 2 days ago</p>
                                </div>
                                <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                                    Continue Lesson
                                </button>
                            </div>

                            <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <Icon name="Trophy" size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Next Contest</h3>
                                        <p className="text-xs text-muted-foreground">Compete and climb the ranks</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50 border border-border mb-4">
                                    <p className="font-medium text-foreground mb-1">Weekly Contest 56</p>
                                    <p className="text-xs text-muted-foreground">Starts in 2 days, 4 hours</p>
                                </div>
                                <button className="w-full py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors">
                                    Register Now
                                </button>
                            </div>
                        </div>

                        <RecommendedProblems problems={recommended} />
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <RecentActivity activities={recentActivities} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
