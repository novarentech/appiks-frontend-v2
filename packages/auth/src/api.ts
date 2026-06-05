import type { ApiResponse, LoginInput, CustomUser } from "@appiks/types";
import { decodeJWT } from "./helpers";

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// ─── Login ──────────────────────────────────────────────────────────────────────

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    expiresIn: string;
  };
  message?: string;
}

export async function loginAPI(credentials: LoginInput): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  return response.json();
}

// ─── Refresh Token ──────────────────────────────────────────────────────────────

export interface RefreshResponse {
  success: boolean;
  data: {
    token: string;
    expiresIn: string;
  };
}

export async function refreshTokenAPI(token: string): Promise<RefreshResponse> {
  const response = await fetch(`${API_BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status}`);
  }

  return response.json();
}

// ─── Build CustomUser from token ────────────────────────────────────────────────

export function buildUserFromToken(
  token: string,
  expiresIn: string
): CustomUser | null {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: payload.username,
    username: payload.username,
    name: payload.name,
    role: payload.role,
    verified: payload.verified,
    token,
    expiresIn,
    room: payload.room,
    mentor: payload.mentor,
    school: payload.school,
  };
}

// ─── Mood Record ────────────────────────────────────────────────────────────────

export async function checkMoodRecordAPI(token: string): Promise<ApiResponse<{ can: boolean }>> {
  const response = await fetch(`${API_BASE_URL}/mood_record/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Mood check failed: ${response.status}`);
  }

  return response.json();
}
