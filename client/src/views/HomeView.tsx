// Styles
import "@/assets/css/components/Home.css";

// Comps
import { HomeBanner } from "@/components/app/molecules/HomeBanner";
import { HomeDiagram } from "@/components/app/molecules/HomeDiagram";
import { HomeFeatures } from "@/components/app/molecules/HomeFeatures";
import { HomeAudience } from "@/components/app/molecules/HomeAudience";
import { HomeExamples } from "@/components/app/molecules/HomeExamples";
import { HomeFooter } from "@/components/app/molecules/HomeFooter";

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

const HomeView = () => {
    // Title
    useDocumentTitle("Scripta | Code, document, visualize")

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