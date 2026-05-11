// Styles
import "@/assets/css/components/Home.css";

// Comps
import { HomeBanner } from "@/components/app/molecules/HomeBanner";
import { HomeDiagram } from "@/components/app/molecules/HomeDiagram";
import { HomeFeatures } from "@/components/app/molecules/HomeFeatures";
import { HomeAudience } from "@/components/app/molecules/HomeAudience";
import { HomeExamples } from "@/components/app/molecules/HomeExamples";
import { HomeFooter } from "@/components/app/molecules/HomeFooter";

const HomeView = () => {
    return (
        <main>
            <HomeBanner />
            <HomeDiagram />
            <HomeFeatures />
            <HomeAudience />
            <HomeExamples />
            <HomeFooter />
        </main>
    )
}

export default HomeView