// packages
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// components
import { MainLayout } from "@/layouts";
import {
  Auth,
  CodeEditor,
  Dashboard,
  Home,
  Profile,
  QuestionsList,
} from "@/pages";
import { AfterAuthRedirectRoute, ProtectedRoute } from "@/protected";

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
          path="/folder/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <QuestionsList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/question/:id"
          element={
            <ProtectedRoute>
              <CodeEditor />
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
