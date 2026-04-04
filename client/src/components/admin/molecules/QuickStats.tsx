import { Code, Globe, Braces, Clock } from "lucide-react"

// Styles
import "@/assets/css/components/QuickStats.css";

// Sub component
import QuickStatsItem from "../atoms/QuickStatsItem"

const stats = [
    {
        title: "Total Snippets",
        icon: Code,
        value: "24"
    },
    {
        title: "Public Snippets",
        icon: Globe,
        value: "15"
    },
    {
        title: "Languages Used",
        icon: Braces,
        value: "6"
    },
    {
        title: "Recent Activity",
        icon: Clock,
        value: "Today"
    },
]

const QuickStats = () => {
    return (
        <div className="quick-stats">
            {stats.map((item) => (
                <QuickStatsItem
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    value={item.value}
                />
            ))}
        </div>
    )
}

export default QuickStats