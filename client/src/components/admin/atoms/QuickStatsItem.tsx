import type { LucideIcon } from "lucide-react";

type QuickStatsItemType = {
    title: string;
    icon: LucideIcon;
    value: string;
}

const QuickStatsItem = ({ title, icon: Icon, value } : QuickStatsItemType) => {
    return (
        <div className="quick-stats-item" key={title}>
            <div className="top-quick-stats-item">
                <h1>{title}</h1>
                <Icon />
            </div>
            <h2>{value}</h2>
        </div>
    )
}

export default QuickStatsItem