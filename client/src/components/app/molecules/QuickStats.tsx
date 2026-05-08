import { Code, Globe, Braces, Clock } from "lucide-react"

// Styles
import "@/assets/css/components/QuickStats.css";

// Sub component
import QuickStatsItem from "../atoms/QuickStatsItem"

// Query
import { useGetStats } from "@/services/users/queries";

// utils
import { formatActivity } from "@/utils/formatActivity";

const QuickStats = () => {
    const { data, isError } = useGetStats();
    console.log(data)

    if (isError || !data) return null;

    const stats = [
        { title: "Total Snippets", icon: Code, value: String(data.totalSnippets) },
        { title: "Public Snippets", icon: Globe, value: String(data.publicSnippets) },
        { title: "Languages Used", icon: Braces, value: String(data.languagesUsed) },
        { title: "Recent Activity", icon: Clock, value: formatActivity(data.lastUpdated) },
    ];

    return (
        <div className="quick-stats">
            {stats.map((item) => (
                <QuickStatsItem key={item.title} {...item} />
            ))}
        </div>
    )
}

export { QuickStats };