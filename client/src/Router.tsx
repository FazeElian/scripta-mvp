import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import { lazy } from "react";

// app Layout Component & root layout for auth
const RootLayout = lazy(() => import("./RootLayout"));
const AppNotFoundView = lazy(() => import("./views/AppNotFoundView"));
const SideBar = lazy(() => import("@/components/app/SideBar").then(m => ({ default: m.SideBar })));

// auth views
const HomeView = lazy(() => import("@/views/HomeView"));
const LoginView = lazy(() => import("@/views/auth/LoginView"));
const RegisterView = lazy(() => import("@/views/auth/RegisterView"));
const AuthCallbackView = lazy(() => import("@/views/auth/AuthCallbackView"));

// app views
const DashboardView = lazy(() => import("./views/app/DashboardView"));
const AccountView = lazy(() => import("./views/app/AccountView"));
const ExploreView = lazy(() => import("./views/app/ExploreView"));
const NewSnippetView = lazy(() => import("./views/app/snippets/NewSnippetView"));
const PublicSnippetView = lazy(() => import("./views/app/snippets/PublicSnippetView"));
const EditorView = lazy(() => import("./views/app/EditorView"));
const ProfileView = lazy(() => import("./views/app/ProfileView"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
        element: <AppNotFoundView />,
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />;
}