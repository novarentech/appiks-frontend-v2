import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar";
import { getInitials } from "../../../utils/initials";

const roleMap: Record<string, string> = {
  gurubk: "Guru BK",
  counselor: "Guru BK",
  psychologist: "Psikolog",
  super: "Super Admin",
  superadmin: "Super Admin",
  admin: "Admin Sekolah",
  teacher: "Guru",
  head_teacher: "Kepala Sekolah",
  headteacher: "Kepala Sekolah",
  student: "Siswa",
};

function formatRole(role: string): string {
  if (!role) return "";
  const key = role.toLowerCase().replace(/\s+/g, "").replace(/_/g, "");
  return roleMap[key] || role.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function NavUser({
  user,
  logoutUrl,
}: {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  logoutUrl: string;
}) {
  const { isMobile } = useSidebar();
  const formattedRole = formatRole(user.role);
  const initials = getInitials(user.name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{formattedRole}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{formattedRole}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { window.location.href = logoutUrl; }}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
