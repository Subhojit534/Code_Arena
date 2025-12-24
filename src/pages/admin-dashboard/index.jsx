import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../../components/navigation/AdminNavigation';
import NavigationBreadcrumbs from '../../components/navigation/NavigationBreadcrumbs';
import MetricCard from './components/MetricCard';
import QuickActionTile from './components/QuickActionTile';
import ActivityFeedItem from './components/ActivityFeedItem';
import AlertItem from './components/AlertItem';
import PerformanceChart from './components/PerformanceChart';
import EngagementChart from './components/EngagementChart';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const mockAlerts = [
            {
                id: 1,
                type: 'warning',
                title: 'High Server Load',
                message: 'Server CPU usage has exceeded 80% for the past 15 minutes. Consider scaling resources.',
                timestamp: '5 minutes ago'
            },
            {
                id: 2,
                type: 'info',
                title: 'Scheduled Maintenance',
                message: 'System maintenance scheduled for December 20, 2025 at 2:00 AM UTC. Expected downtime: 2 hours.',
                timestamp: '1 hour ago'
            },
            {
                id: 3,
                type: 'critical',
                title: 'Security Update Available',
                message: 'Critical security patch available for execution environment. Update recommended immediately.',
                timestamp: '3 hours ago'
            }
        ];
        setAlerts(mockAlerts);
    }, []);

    const handleLogout = () => {
        navigate('/admin-login');
    };

    const handleDismissAlert = (alertId) => {
        setAlerts(alerts?.filter(alert => alert?.id !== alertId));
    };

    const platformMetrics = [
        {
            title: 'Active Students',
            value: '2,847',
            change: '+12.5%',
            changeType: 'positive',
            icon: 'Users',
            iconColor: 'bg-primary'
        },
        {
            title: 'Total Problems',
            value: '456',
            change: '+8',
            changeType: 'positive',
            icon: 'Code2',
            iconColor: 'bg-accent'
        },
        {
            title: 'Submissions Today',
            value: '1,234',
            change: '+23.1%',
            changeType: 'positive',
            icon: 'Send',
            iconColor: 'bg-success'
        },
        {
            title: 'System Uptime',
            value: '99.8%',
            change: '-0.1%',
            changeType: 'negative',
            icon: 'Activity',
            iconColor: 'bg-warning'
        }
    ];

    const quickActions = [
        {
            title: 'Problem Management',
            description: 'Create, edit, and organize coding problems with difficulty levels and tags',
            icon: 'Code',
            iconColor: 'bg-primary',
            path: '/problem-management',
            badge: '456 problems'
        },
        {
            title: 'Test Case Management',
            description: 'Configure public and private test cases with input/output validation',
            icon: 'FileCheck',
            iconColor: 'bg-accent',
            path: '/test-case-management',
            badge: '1,824 cases'
        },
        {
            title: 'Student Analytics',
            description: 'View detailed performance metrics, submission history, and progress tracking',
            icon: 'BarChart3',
            iconColor: 'bg-success',
            path: '/admin-dashboard',
            badge: '2,847 students'
        },
        {
            title: 'System Reports',
            description: 'Generate comprehensive reports on platform usage, performance, and trends',
            icon: 'FileText',
            iconColor: 'bg-warning',
            path: '/admin-dashboard',
            badge: 'New'
        }
    ];

    const recentActivities = [
        {
            type: 'submission',
            user: 'Sarah Johnson',
            action: 'submitted solution for',
            problem: 'Two Sum Problem',
            timestamp: '2 minutes ago',
            status: 'success'
        },
        {
            type: 'registration',
            user: 'Michael Chen',
            action: 'registered on the platform',
            timestamp: '15 minutes ago'
        },
        {
            type: 'submission',
            user: 'Emily Rodriguez',
            action: 'submitted solution for',
            problem: 'Binary Search Tree',
            timestamp: '23 minutes ago',
            status: 'failed'
        },
        {
            type: 'achievement',
            user: 'David Kim',
            action: 'earned achievement',
            problem: '50 Problems Solved',
            timestamp: '45 minutes ago',
            status: 'success'
        },
        {
            type: 'submission',
            user: 'Lisa Anderson',
            action: 'submitted solution for',
            problem: 'Merge Sort Implementation',
            timestamp: '1 hour ago',
            status: 'success'
        }
    ];

    const engagementData = [
        { name: 'Mon', submissions: 245 },
        { name: 'Tue', submissions: 312 },
        { name: 'Wed', submissions: 289 },
        { name: 'Thu', submissions: 401 },
        { name: 'Fri', submissions: 378 },
        { name: 'Sat', submissions: 156 },
        { name: 'Sun', submissions: 198 }
    ];

    const difficultyData = [
        { name: 'Easy', problems: 156 },
        { name: 'Medium', problems: 234 },
        { name: 'Hard', problems: 66 }
    ];

    const performanceMetrics = [
        {
            title: 'Server Status',
            status: 'healthy',
            value: '98.5',
            unit: '%',
            icon: 'Server',
            lastUpdated: '1 min ago'
        },
        {
            title: 'Database Health',
            status: 'healthy',
            value: '99.2',
            unit: '%',
            icon: 'Database',
            lastUpdated: '2 min ago'
        },
        {
            title: 'Execution Environment',
            status: 'warning',
            value: '82.3',
            unit: '%',
            icon: 'Cpu',
            lastUpdated: '30 sec ago'
        },
        {
            title: 'API Response Time',
            status: 'healthy',
            value: '145',
            unit: 'ms',
            icon: 'Zap',
            lastUpdated: '1 min ago'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <AdminNavigation onLogout={handleLogout} />
            <NavigationBreadcrumbs />
            <main className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name="LayoutDashboard" size={24} className="text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Platform overview and management tools</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {platformMetrics?.map((metric, index) => (
                        <MetricCard key={index} {...metric} />
                    ))}
                </div>

                {alerts?.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Icon name="Bell" size={20} />
                            Administrative Alerts
                        </h2>
                        <div className="space-y-3">
                            {alerts?.map((alert) => (
                                <AlertItem
                                    key={alert?.id}
                                    {...alert}
                                    onDismiss={() => handleDismissAlert(alert?.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <EngagementChart
                        data={engagementData}
                        type="line"
                        title="Weekly Submission Trends"
                        dataKey="submissions"
                        color="#2563EB"
                    />
                    <EngagementChart
                        data={difficultyData}
                        type="bar"
                        title="Problem Difficulty Distribution"
                        dataKey="problems"
                        color="#10B981"
                    />
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Icon name="Zap" size={20} />
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickActions?.map((action, index) => (
                            <QuickActionTile key={index} {...action} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Icon name="Activity" size={20} />
                                Recent Activity
                            </h2>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {recentActivities?.map((activity, index) => (
                                    <ActivityFeedItem key={index} {...activity} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Icon name="Monitor" size={20} />
                                System Performance
                            </h2>
                            <div className="space-y-4">
                                {performanceMetrics?.map((metric, index) => (
                                    <PerformanceChart key={index} {...metric} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                            <Icon name="TrendingUp" size={20} />
                            Platform Insights
                        </h2>
                        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1">
                            View Full Report
                            <Icon name="ExternalLink" size={14} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-3xl font-bold text-foreground mb-1">87.3%</p>
                            <p className="text-sm text-muted-foreground">Average Success Rate</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-3xl font-bold text-foreground mb-1">4.2</p>
                            <p className="text-sm text-muted-foreground">Avg Problems/Student</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-3xl font-bold text-foreground mb-1">23 min</p>
                            <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-3xl font-bold text-foreground mb-1">6</p>
                            <p className="text-sm text-muted-foreground">Most Popular Language</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;