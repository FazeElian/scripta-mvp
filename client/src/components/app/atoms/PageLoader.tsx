import { bouncy } from "ldrs";

// Styles
import "@/assets/css/components/PageLoader.css";

bouncy.register()
const PageLoader = () => {
    return (
        <div className="page-loader">
            <l-bouncy
                size="55"
                speed="1.75" 
                color="#07B863" 
            />
            <h1>Loading...</h1>
        </div>
    )
}

export { PageLoader };