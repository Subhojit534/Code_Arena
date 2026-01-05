import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const SkillRadar = ({ skills }) => {
    const data = skills
        ? Object.entries(skills).map(([subject, score]) => ({
            subject,
            A: score,
            fullMark: 100
        }))
        : [
            { subject: 'Algorithms', A: 120, fullMark: 150 },
            { subject: 'Data Structures', A: 98, fullMark: 150 },
            { subject: 'Math', A: 86, fullMark: 150 },
            { subject: 'Database', A: 99, fullMark: 150 },
            { subject: 'System Design', A: 85, fullMark: 150 },
            { subject: 'Language', A: 65, fullMark: 150 },
        ];

    return (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 h-[400px]">
            <h3 className="text-lg font-semibold text-foreground mb-4">Skill Proficiency</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                    <PolarRadiusAxis opacity={0} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillRadar;
