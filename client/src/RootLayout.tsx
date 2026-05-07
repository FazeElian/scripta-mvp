import { Outlet } from "react-router-dom";
import UserProvider from "./views/UserProvider";

export default function RootLayout() {
   return (
        <UserProvider>
            <Outlet />
        </UserProvider>
   );
}