import { EclipseIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import authBackground from "@/shared/assets/images/auth.jpg";

export default function AuthLayout() {
  return (
    <div className="h-dvh grid lg:grid-cols-2">
      <div className="size-full flex flex-col gap-20 p-6 md:p-8">
        <div className="flex justify-center gap-2 lg:justify-start">
          <Link to="/" className="flex items-center gap-2 font-morabba-heavy text-xl">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <EclipseIcon size={18} />
            </div>
            زینگ
          </Link>
        </div>
        <div className="md:flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>

        <div className="flex-1 md:flex-none flex items-end justify-center text-xs text-primary-foreground">
          تمامی حقوق این وب‌سایت متعلق به زینگ می‌باشد
        </div>
      </div>

      {/* Image */}
      <div className="relative hidden lg:block overflow-hidden">
        <img className="size-full object-cover object-bottom" src={authBackground} alt="" />
      </div>
    </div>
  );
}
