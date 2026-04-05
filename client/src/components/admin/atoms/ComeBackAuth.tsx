import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ComeBackAuth = () => {
    return (
        <Link to="/" className="come-back-auth">
            <MoveLeft />
            Come Back to Home
        </Link>
    )
}

export { ComeBackAuth };