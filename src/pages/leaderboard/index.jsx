import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StudentNavigation from '../../components/navigation/StudentNavigation';
import AdminNavigation from '../../components/navigation/AdminNavigation';
import Icon from '../../components/AppIcon';
import { useLocation } from 'react-router-dom';

const Leaderboard = () => {
    const location = useLocation();
    const isAdmin = location.pathname.includes('/admin');

    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await api.get('/leaderboard');
                setLeaderboard(response.data);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const LogoutHandler = () => {
        window.location.href = isAdmin ? '/admin-login' : '/student-login-registration';
    };

    return (
        <div className="min-h-screen bg-background pb-12">
            {isAdmin ? (
                <AdminNavigation onLogout={LogoutHandler} />
            ) : (
                <StudentNavigation onLogout={LogoutHandler} />
            )}

            <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
                    <p className="text-muted-foreground mt-2">Top performers in the CodeArena community</p>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-8 text-center text-muted-foreground">Loading specific ranking data...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50 border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-20">Rank</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Solved</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">XP</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {leaderboard.map((student) => (
                                        <tr
                                            key={student.rank}
                                            className={`
                                                hover:bg-muted/30 transition-colors
                                                ${student.isCurrentUser ? 'bg-primary/5 border-l-2 border-l-primary' : ''}
                                            `}
                                        >
                                            <td className="px-6 py-4">
                                                <div className={`
                                                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                                    ${student.rank === 1 ? 'bg-yellow-500/10 text-yellow-600' :
                                                        student.rank === 2 ? 'bg-slate-400/10 text-slate-500' :
                                                            student.rank === 3 ? 'bg-orange-500/10 text-orange-600' : 'text-muted-foreground'}
                                                `}>
                                                    {student.rank <= 3 ? <Icon name="Trophy" size={14} /> : student.rank}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-xs">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-foreground flex items-center gap-2">
                                                            {student.name}
                                                            {student.isCurrentUser && (
                                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary uppercase">You</span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">@{student.handle}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                                                    {student.solved}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="text-sm font-semibold text-foreground">{student.xp.toLocaleString()}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Leaderboard;
