"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  UserCog,
  BookText,
  Users,
  MessageCircle,
  Calendar,
  School,
  UserCheck,
  Activity,
  BookOpen,
  Smile,
  FileText,
  Briefcase,
  ClipboardList,
} from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../ui/sidebar";

// Sample data for teams fallback
const data = {
  teams: [
    {
      name: "Appiks Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Appiks Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Appiks Ltd.",
      logo: Command,
      plan: "Free",
    },
  ],
  user: {
    name: "User",
    role: "counselor",
    avatar: "",
  },
};

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

// Menu definitions defined once to prevent duplication
const adminNav: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Kelola Akun",
    url: "/dashboard/account-management",
    icon: UserCog,
  },
  {
    title: "Kelola Konten",
    url: "/dashboard/content-management",
    icon: BookText,
  },
  {
    title: "Data Kelas",
    url: "/dashboard/class-data",
    icon: FaChalkboardTeacher,
  },
];

const teacherNav: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Data Siswa",
    url: "/dashboard/student-data",
    icon: Users,
  },
];

const counselorNav: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Data Siswa",
    url: "/dashboard/student-data",
    icon: Users,
  },
  {
    title: "Curhatan Siswa",
    url: "/dashboard/student-share",
    icon: MessageCircle,
  },
  {
    title: "Jadwal Konseling",
    url: "/dashboard/counseling-schedule",
    icon: Calendar,
  },
];

const headteacherNav: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Data Sekolah",
    url: "/dashboard/school-data",
    icon: UserCog,
  },
];

const superadminNav: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Kelola Sekolah",
    url: "/dashboard/school-management",
    icon: School,
  },
  {
    title: "Kelola Admin",
    url: "/dashboard/admin-management",
    icon: Users,
  },
  {
    title: "Kelola Psikolog",
    url: "/dashboard/psychologist-management",
    icon: UserCheck,
  },
  {
    title: "Monitoring Sekolah",
    url: "/dashboard/school-monitor",
    icon: Activity,
  },
  {
    title: "Kelola Konten",
    url: "/dashboard/content",
    icon: BookOpen,
  },
];

const psychologistNav: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Overview Mood",
    url: "/dashboard/mood-overview",
    icon: Smile,
  },
  {
    title: "Catatan Sesi",
    url: "/dashboard/session-notes",
    icon: FileText,
  },
  {
    title: "Kasus Siswa",
    url: "/dashboard/student-cases",
    icon: Briefcase,
  },
  {
    title: "Laporan",
    url: "/dashboard/reports",
    icon: ClipboardList,
  },
  {
    title: "Jadwal",
    url: "/dashboard/schedule",
    icon: Calendar,
  },
];

// Mapping supporting all roles (matching roleMap keys)
const roleBasedNavigation: Record<string, NavigationItem[]> = {
  admin: adminNav,
  teacher: teacherNav,
  counselor: counselorNav,
  headteacher: headteacherNav,
  super: superadminNav,
  psychologist: psychologistNav,
};

const getNormalizedRole = (role: string): string => {
  if (!role) return "";
  return role.toLowerCase().replace(/\s+/g, "").replace(/_/g, "");
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  showTeamSwitcher?: boolean;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  logoutUrl: string;
  profileUrl?: string;
}

export function AppSidebar({
  showTeamSwitcher = false,
  user,
  logoutUrl,
  profileUrl,
  ...props
}: AppSidebarProps) {
  const sidebarUser = user || data.user;
  const roleKey = getNormalizedRole(sidebarUser.role || "");
  const navigationItems = roleBasedNavigation[roleKey] || [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {showTeamSwitcher ? (
          <TeamSwitcher teams={data.teams} />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Appiks Portal</span>
                    <span className="">v1.0.0</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} logoutUrl={logoutUrl} profileUrl={profileUrl} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
