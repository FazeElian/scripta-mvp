import { Link } from "react-router-dom";
import { Calendar, Link as LinkIcon, MoveLeft, Terminal } from "lucide-react";
import Github from "@/assets/img/github.png";

// Styles
import "@/assets/css/components/Profile.css";

// Components
import { PublicSnippetsGallery } from "@/components/app/molecules/PublicSnippetsGallery";

const ProfileView = () => {
    return (
        <main className="app-content">
            <Link to="/app/explore" className="profile-top">
                <MoveLeft />
                Come Back to Explore
            </Link>

            <div className="profile-info">
                <div className="profile-avatar">
                    <Terminal />
                </div>
                <div className="profile-txt">
                    <h1>John Doe</h1>
                    <h2>@johndoe</h2>
                    <p>Computer Science student at MIT. Passionate about algorithms, distributed systems, and open source. Always learning, always building.</p>

                    <div className="btm-profile-txt">
                        <div className="btm-profile-txt--item">
                            <LinkIcon />
                            johndoe.dev
                        </div>
                        <div className="btm-profile-txt--item">
                            <Calendar />
                            Member since January 2026
                        </div>
                    </div>
                </div>
                <Link
                    to="https://github.com/"
                    className="btn-github-profile"
                    target="_blank"
                >
                    <img src={Github} alt="Github" />
                </Link>
            </div>

            <h2 className="profile-snippets-title">Public Snippets (4)</h2>
            <PublicSnippetsGallery />
        </main>
    )
}

export default ProfileView