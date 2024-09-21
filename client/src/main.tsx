// PACKAGES
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

// COMPONENTS
import App from "@/App.tsx";
import {
  AuthContextWrapper,
  QueryClientWrapper,
  ThemeWrapper,
} from "@/components/wrappers";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextWrapper>
      <ThemeWrapper>
        <QueryClientWrapper>
          <Toaster position="bottom-right" reverseOrder={false} />
          <App />
        </QueryClientWrapper>
      </ThemeWrapper>
    </AuthContextWrapper>
  </StrictMode>,
);
