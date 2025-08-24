import jwtDecode from "jwt-decode";

interface TokenPayload {
  username: string;
  exp: number;
}

// 🔹 Simulate token creation (normally returned from backend)
export function createFakeToken(username: string): string {
  const payload: TokenPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
  };
  return btoa(JSON.stringify(payload)); // encode payload to base64
}

// 🔹 Save token to localStorage
export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

// 🔹 Get token from localStorage
export function getToken(): string | null {
  return localStorage.getItem("token");
}

// 🔹 Decode token
export function decodeToken(token: string): TokenPayload | null {
  try {
    return JSON.parse(atob(token)) as TokenPayload;
  } catch {
    return null;
  }
}

// 🔹 Check if token is valid (not expired)
export function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded) return false;

  return decoded.exp > Math.floor(Date.now() / 1000);
}

// 🔹 Logout helper (alias for removeToken)
export function logout(): void {
  localStorage.removeItem("token");
}

// 🔹 Explicit removeToken (used in MainNavbar)
export function removeToken(): void {
  logout(); // just reuse logout
}
