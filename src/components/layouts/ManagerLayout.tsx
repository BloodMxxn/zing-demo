import { useState } from "react";
import { EclipseIcon, MenuIcon, XIcon, LayoutDashboardIcon, ClipboardListIcon, UsersIcon, SettingsIcon, LogOutIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { cn } from "@/shared/lib/cn";

const navLinks = [
  { to: "/manager", label: "داشبورد", icon: LayoutDashboardIcon, end: true },
  { to: "/manager/reports", label: "گزارش‌ها", icon: ClipboardListIcon },
  { to: "/manager/cashiers", label: "صندوق‌داران", icon: UsersIcon },
  { to: "/manager/fields", label: "فیلدهای گزارش", icon: SettingsIcon },
];

export default function ManagerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Link to="/manager" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <EclipseIcon size={20} />
            </div>
            <span className="font-morabba-heavy text-xl">زینگ</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Role Badge */}
        <div className="px-4 pt-4 pb-2">
          <div className="rounded-xl bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
            مدیر کسب‌وکار
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1 px-3 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-bold">
              م
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">مدیر فروشگاه</p>
              <p className="truncate text-xs text-muted-foreground">admin@zing.ir</p>
            </div>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <LogOutIcon size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          >
            <MenuIcon size={20} />
          </button>
          <Link to="/manager" className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <EclipseIcon size={14} />
            </div>
            <span className="font-morabba-heavy text-base">زینگ</span>
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
