import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import StudentNavigation from '../../components/navigation/StudentNavigation';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import ActivityHeatmap from './components/ActivityHeatmap';
import RecentActivity from './components/RecentActivity';
import SkillRadar from './components/SkillRadar';
import TopicPerformance from './components/TopicPerformance';

const StudentProfile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get('/user/profile');
                const data = response.data;

                // Transform backend data to frontend structure
                const mappedUser = {
                    name: data.name,
                    username: data.handle,
                    avatarUrl: null,
                    bio: "Passionate full-stack developer learning algorithms and data structures. Love React and Python!",
                    location: "San Francisco, CA",
                    joinedAt: "2025-01-15T10:00:00Z",
                    githubUrl: "https://github.com",
                    stats: {
                        rank: data.globalRank,
                        problemsSolved: data.solvedProblems ? data.solvedProblems.length : 0,
                        streak: data.currentStreak,
                        xp: data.totalXP
                    },
                    skillStats: data.skillStats,
                    topicStats: data.topicStats
                };

                setUser(mappedUser);
                setActivities(data.recentActivity || []);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;
    }

    if (!user) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Failed to load profile data</div>;
    }

    const handleLogout = () => {
        navigate('/student-login-registration');
    };

    return (
        <div className="min-h-screen bg-background pb-12">
            <StudentNavigation onLogout={handleLogout} />

            <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <ProfileHeader user={user} isOwnProfile={true} />

                <ProfileStats stats={user.stats} />

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <SkillRadar skills={user.skillStats} />
                            <TopicPerformance topics={user.topicStats} />
                        </div>
                        <ActivityHeatmap />
                    </div>

                    <div className="lg:col-span-1">
                        <RecentActivity activities={activities} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentProfile;
