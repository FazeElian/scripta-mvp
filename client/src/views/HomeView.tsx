import { Link } from "react-router-dom"

const HomeView = () => {
    return (
        <div className="not-found">
            <h1>Scripta</h1>
                <div className="flex flex-col mt-2">
                    <Link to="/app/dashboard">Dashboard</Link>
                    <Link to="/auth/login">Login</Link>
                    <Link to="/auth/register">Register</Link>
                </div>
        </div>
    )
}

export default HomeView