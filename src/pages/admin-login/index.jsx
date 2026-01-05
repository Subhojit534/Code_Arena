import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminBranding from './components/AdminBranding';
import LoginForm from './components/LoginForm';
import SecurityFeatures from './components/SecurityFeature';
import TrustIndicators from './components/TrustIndicator';

const AdminLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('adminAuth');
        if (isAuthenticated === 'true') {
            navigate('/admin-dashboard');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left Column - Branding & Information */}
                        <div className="hidden lg:block space-y-8">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-primary">Secure Administrative Portal</span>
                                </div>

                                <div>
                                    <h2 className="text-4xl font-bold text-foreground mb-4">
                                        Manage Your Coding Platform
                                    </h2>
                                    <p className="text-lg text-muted-foreground">
                                        Access comprehensive tools for problem management, analytics, and platform administration with enterprise-level security.
                                    </p>
                                </div>
                            </div>

                            <TrustIndicators />

                            <div className="p-6 bg-card rounded-2xl border border-border shadow-soft">
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    Security Features
                                </h3>
                                <SecurityFeatures />
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-success rounded-full"></div>
                                    <span>System Status: Operational</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                                    <span>Last Updated: {new Date()?.toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Login Form */}
                        <div className="w-full">
                            <div className="bg-card rounded-2xl border border-border shadow-elevated p-8 lg:p-10">
                                <AdminBranding />

                                <div className="mt-8 mb-6 lg:hidden">
                                    <SecurityFeatures />
                                </div>

                                <div className="mt-8">
                                    <LoginForm />
                                </div>

                                <div className="mt-8 pt-6 border-t border-border">
                                    <p className="text-xs text-center text-muted-foreground">
                                        Protected by enterprise-grade security. All administrative actions are logged and monitored for compliance.
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Trust Indicators */}
                            <div className="mt-6 lg:hidden">
                                <TrustIndicators />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>&copy; {new Date()?.getFullYear()} CodeArena. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <button className="hover:text-foreground transition-colors">Privacy Policy</button>
                            <button className="hover:text-foreground transition-colors">Terms of Service</button>
                            <button className="hover:text-foreground transition-colors">Support</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;