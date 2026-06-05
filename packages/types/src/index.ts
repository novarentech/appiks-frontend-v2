import { z } from "zod";

// ─── User Roles ────────────────────────────────────────────────────────────────

export type UserRole =
  | "student"
  | "admin"
  | "teacher"
  | "counselor"
  | "head_teacher"
  | "psychologist"
  | "super";

export const SCHOOL_ROLES: UserRole[] = [
  "admin",
  "teacher",
  "counselor",
  "head_teacher",
];

const isProd = process.env.NODE_ENV === "production";

export const ROLE_REDIRECT_MAP: Record<UserRole, string> = {
  student: isProd ? "https://app.appiks.id/dashboard" : "http://localhost:3001/dashboard",
  admin: isProd ? "https://school.appiks.id/dashboard" : "http://localhost:3002/dashboard",
  teacher: isProd ? "https://school.appiks.id/dashboard" : "http://localhost:3002/dashboard",
  counselor: isProd ? "https://school.appiks.id/dashboard" : "http://localhost:3002/dashboard",
  head_teacher: isProd ? "https://school.appiks.id/dashboard" : "http://localhost:3002/dashboard",
  psychologist: isProd ? "https://psikolog.appiks.id/dashboard" : "http://localhost:3003/dashboard",
  super: isProd ? "https://super.appiks.id/dashboard" : "http://localhost:3004/dashboard",
};

// ─── User & Session ────────────────────────────────────────────────────────────

export interface CustomUser {
  id: string;
  username: string;
  name?: string;
  role: UserRole;
  verified: boolean;
  token: string;
  expiresIn: string;
  phone?: string;
  room?: string;
  mentor?: string;
  school?: string;
  email?: string;
  image?: string;
}

export interface CustomSession {
  user: CustomUser;
  expires: string;
}

// ─── API Response ───────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── Zod Schemas ───────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  username: z.string().min(3, "Minimal 3 karakter"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const userRoleSchema = z.enum([
  "student",
  "admin",
  "teacher",
  "counselor",
  "head_teacher",
  "psychologist",
  "super",
]);

export const jwtPayloadSchema = z.object({
  username: z.string(),
  name: z.string().optional(),
  role: userRoleSchema,
  verified: z.boolean(),
  room: z.string().optional(),
  mentor: z.string().optional(),
  school: z.string().optional(),
  exp: z.number().optional(),
  iat: z.number().optional(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
