import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

// Views
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";

import HomeView from "@/views/HomeView";
import DashboardView from "@/views/admin/DashboardView";
import { SideBar } from "./components/admin/SideBar";

export default function Router () {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route index element={<HomeView />} />
        <Route path="/auth/register" element={<RegisterView />} />
        <Route path="/auth/login" element={<LoginView />} />

        <Route element={<SideBar />}>
          <Route path="/dashboard" element={<DashboardView />} />
        </Route>
      </Routes>
    </Suspense>
  )
}