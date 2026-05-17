import { FileCode, Globe, TrendingUp, Users } from "lucide-react";

const stats = [
    { icon: FileCode, label: "Total Snippets", value: 247 },
    { icon: Users, label: "Contributors", value: 42 },
    { icon: Globe, label: "Languages", value: 8 },
    { icon: TrendingUp, label: "New This Week", value: 18 },
];

export const ExploreStats = () => (
    <div className="explore-stats">
        {stats.map((s) => (
            <div key={s.label} className="explore-stats-card">
                <span className="explore-stats-icon">{<s.icon />}</span>
                <div className="explore-stats-txt">
                    <span className="explore-stats-value">{s.value}</span>
                    <span className="explore-stats-label">{s.label}</span>
                </div>
            </div>
        ))}
    </div>
);