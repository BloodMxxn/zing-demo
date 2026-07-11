import { EclipseIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function CashierLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/cashier" className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <EclipseIcon size={14} />
            </div>
            <span className="font-morabba-heavy text-base">زینگ</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-bold">
              ع
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
