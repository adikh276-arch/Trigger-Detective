import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { query } from "@/lib/db";

interface UserInfoResponse {
  user_id: string;
  // add other fields if necessary
}

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const { t } = useTranslation();

  const handleHandshake = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const storedUserId = sessionStorage.getItem("user_id");

    if (storedUserId) {
      setIsAuthResolved(true);
      return;
    }

    if (!token) {
      window.location.href = "/token";
      return;
    }

    try {
      const response = await fetch("https://api.mantracare.com/user/user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data: UserInfoResponse = await response.json();
      const userId = data.user_id;

      if (!userId) {
        throw new Error("User ID not found in response");
      }

      // Store in session storage
      sessionStorage.setItem("user_id", userId);

      // Remove token from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.pathname + url.search);

      // Initialize user in database
      await initializeUser(userId);

      setIsAuthResolved(true);
    } catch (error) {
      console.error("Handshake error:", error);
      window.location.href = "/token";
    }
  };

  const initializeUser = async (userId: string) => {
    try {
      // Check if user exists
      const existingUser = await query("SELECT id FROM users WHERE id = $1", [userId]);
      
      if (existingUser.rows.length === 0) {
        // Insert new user
        await query("INSERT INTO users (id) VALUES ($1)", [userId]);
        console.log("New user initialized in database:", userId);
      }
    } catch (error) {
      console.error("Failed to initialize user in database:", error);
    }
  };

  useEffect(() => {
    handleHandshake();
  }, []);

  if (!isAuthResolved) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-heading font-medium text-foreground anim-fade-in">
            {t("auth_validating_session") || "Validating session..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
