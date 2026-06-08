import type { ReactNode } from "react";
import {
  AppSidebar,
  AppBreadcrumbs,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@appiks/ui";

import type { CustomUser } from "@appiks/types";
import { auth } from "../../auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const customUser = session?.user as CustomUser | undefined;
  const user = customUser
    ? {
        name: customUser.name || customUser.username || "User",
        role: customUser.role || "",
      }
    : undefined;

  const logoutUrl = process.env.AUTH_URL
    ? `${process.env.AUTH_URL}/logout`
    : "http://localhost:3000/logout";

  return (
    <SidebarProvider>
      <AppSidebar showTeamSwitcher user={user} logoutUrl={logoutUrl} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppBreadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
