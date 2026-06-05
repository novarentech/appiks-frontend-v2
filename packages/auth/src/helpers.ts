import jwt from "jsonwebtoken";
import type { JwtPayload } from "@appiks/types";

/**
 * Decode JWT token tanpa verifikasi signature.
 * Digunakan untuk membaca payload dari token yang sudah divalidasi backend.
 */
export function decodeJWT(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Cek apakah token sudah expired berdasarkan field expiresIn (ISO string).
 */
export function isTokenExpiredByDate(expiresIn: string): boolean {
  const expDate = new Date(expiresIn);
  return Date.now() >= expDate.getTime();
}

/**
 * Cek apakah token perlu di-refresh (kurang dari 5 menit sebelum expired).
 */
export function shouldRefreshToken(expiresIn: string): boolean {
  const expDate = new Date(expiresIn);
  const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
  return fiveMinutesFromNow >= expDate.getTime();
}

/**
 * Hitung sisa waktu token dalam milidetik.
 */
export function getTokenRemainingMs(expiresIn: string): number {
  const expDate = new Date(expiresIn);
  return Math.max(0, expDate.getTime() - Date.now());
}
