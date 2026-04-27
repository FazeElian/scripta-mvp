import { createBrowserRouter, Navigate} from "react-router-dom";

// Views
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import AuthCallbackView from "./views/auth/AuthCallbackView";

import HomeView from "@/views/HomeView";

// app views
import DashboardView from "@/views/app/DashboardView";
import AccountView from "@/views/app/AccountView";
import ExploreView from "@/views/app/ExploreView";
import NewSnippetView from "@/views/app/snippets/NewSnippetView";
import PublicSnippetView from "./views/app/snippets/PublicSnippetView";
import EditorView from "@/views/app/EditorView";
import ProfileView from "@/views/app/ProfileView";
import NotFoundView from "@/views/NotFoundView";

// app Layout Component
import { SideBar } from "@/components/app/SideBar";

// Not found
import { AppNotFoundView } from "@/views/AppNotFoundView";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/auth/register",
    element: <RegisterView />,
  },
  {
    path: "/auth/login",
    element: <LoginView />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallbackView />,
  },
  {
    path: "/app",
    element: <SideBar />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardView /> },
      { path: "account", element: <AccountView /> },
      { path: "explore", element: <ExploreView /> },
      { path: "snippets/new", element: <NewSnippetView /> },
      { path: "snippets/editor/:id", element: <EditorView /> },
      { path: "snippets/view/:id", element: <PublicSnippetView /> },
      { path: "profile/:userName", element: <ProfileView /> },
      { path: "*", element: <AppNotFoundView /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);