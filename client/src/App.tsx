import { MainLayout } from "@/layouts";
import { Auth, Dashboard, Home, Profile } from "@/pages";
import ProtectedRoute from "@/protected/protected-route";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AfterAuthRedirectRoute } from "./protected";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AfterAuthRedirectRoute>
              <Home />
            </AfterAuthRedirectRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <AfterAuthRedirectRoute>
              <Auth />
            </AfterAuthRedirectRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
