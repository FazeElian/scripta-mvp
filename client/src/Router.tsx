import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "sonner";

// Views
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";

import HomeView from "@/views/HomeView";

// app views
import DashboardView from "@/views/app/DashboardView";
import FilesView from "./views/app/FilesView";
import AccountView from "./views/app/AccountView";
import ExploreView from "./views/app/ExploreView";
import NewSnippetView from "./views/app/snippets/NewSnippetView";
import ProfileView from "./views/app/ProfileView";
import NotFoundView from "./views/NotFoundView";

// app Layout Component
import { SideBar } from "./components/app/SideBar";

// Not found
import { AppNotFoundView } from "./views/AppNotFoundView";

// Loader comp
import { PageLoader } from "./components/app/atoms/PageLoader";

export default function Router () {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path="/auth/register" element={<RegisterView />} />
        <Route path="/auth/login" element={<LoginView />} />

        <Route element={<SideBar />} path="/app/*">
          <Route path="dashboard" element={<DashboardView />} />
          <Route path="files" element={<FilesView />} />
          <Route path="account" element={<AccountView />} />
          <Route path="explore" element={<ExploreView />} />
          <Route path="snippets/new" element={<NewSnippetView />} />
          <Route path="profile/:userName" element={<ProfileView />} />
          <Route path="*" element={<AppNotFoundView />} />
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
      <Toaster richColors position="top-center" />
    </Suspense>
  )
}