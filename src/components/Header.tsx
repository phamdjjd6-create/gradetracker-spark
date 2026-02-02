import React from "react";
import { FptLogo } from "./FptLogo";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, Loader2, Save, Check, AlertCircle } from "lucide-react";
import { SaveStatus } from "@/hooks/useUserData";

interface HeaderProps {
  saveStatus?: SaveStatus;
  onSaveNow?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ saveStatus = "idle", onSaveNow }) => {
  const { profile, signOut, isAuthenticated, isLoading } = useAuth();

  const renderSaveStatus = () => {
    if (!isAuthenticated) return null;

    switch (saveStatus) {
      case "saving":
        return (
          <span className="saving-indicator saving">
            <Loader2 className="h-4 w-4 animate-spin" />
            Đang lưu...
          </span>
        );
      case "saved":
        return (
          <span className="saving-indicator saved">
            <Check className="h-4 w-4" />
            Đã lưu
          </span>
        );
      case "error":
        return (
          <span className="saving-indicator error">
            <AlertCircle className="h-4 w-4" />
            Lỗi
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <FptLogo size={48} />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                GPA Calculator
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Track • Calculate • Plan
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Save status */}
            <div className="hidden sm:flex items-center gap-2">
              {renderSaveStatus()}
              {isAuthenticated && onSaveNow && saveStatus !== "saving" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSaveNow}
                  className="h-8"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Lưu
                </Button>
              )}
            </div>

            {/* User info */}
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : isAuthenticated && profile ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent rounded-full">
                  <User className="h-4 w-4 text-accent-foreground" />
                  <span className="text-sm font-medium text-accent-foreground">
                    Hi, {profile.username}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Đăng xuất</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href="/login">Đăng nhập</a>
                </Button>
                <Button size="sm" className="btn-primary-gradient" asChild>
                  <a href="/register">Đăng ký</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
