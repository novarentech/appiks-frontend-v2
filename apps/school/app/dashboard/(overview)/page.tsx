import { auth } from "../../../auth";
import type { CustomUser } from "@appiks/types";
import * as React from "react";
import { AdminOverview } from "./components/AdminOverview";
import { TeacherOverview } from "./components/TeacherOverview";
import { CounselorOverview } from "./components/CounselorOverview";
import { HeadTeacherOverview } from "./components/HeadTeacherOverview";

export default async function Page() {
  const session = await auth();
  const customUser = session?.user as CustomUser | undefined;

  // Resolve user role from auth session (default to admin)
  const activeRole = customUser?.role || "admin";

  // Clean, separated layouts
  const renderDashboard = () => {
    switch (activeRole) {
      case "admin":
        return <AdminOverview />;
      case "teacher":
        return <TeacherOverview />;
      case "counselor":
        return <CounselorOverview />;
      case "head_teacher":
        return <HeadTeacherOverview />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
          Memuat dashboard...
        </div>
      }
    >
      {renderDashboard()}
    </React.Suspense>
  );
}
