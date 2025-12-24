import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TopicPerformance = ({ topics }) => {
    const data = topics
        ? Object.entries(topics).map(([name, score]) => ({
            name,
            solved: score,
            total: 100
        }))
        : [
            { name: 'Arrays', solved: 45, total: 60 },
            { name: 'Strings', solved: 32, total: 50 },
            { name: 'Linked Lists', solved: 28, total: 35 },
            { name: 'Trees', solved: 24, total: 45 },
            { name: 'DP', solved: 15, total: 40 },
            { name: 'Graphs', solved: 12, total: 30 },
        ];

    return (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 h-[400px]">
            <h3 className="text-lg font-semibold text-foreground mb-4">Topic Performance</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.1} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    />
                    <Bar dataKey="total" stackId="a" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} barSize={20} />
                    <Bar dataKey="solved" stackId="a" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopicPerformance;
