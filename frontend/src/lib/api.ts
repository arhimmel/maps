const API_BASE = "/api";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

async function parseBody<T>(res: Response): Promise<T> {
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined as T;
  }
  return res.json();
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401 && accessToken) {
    // Attempt silent refresh
    const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      setAccessToken(data.access_token);
      headers.set("Authorization", `Bearer ${data.access_token}`);

      const retryRes = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
        credentials: "include",
      });

      if (!retryRes.ok) {
        // Clear token on retry failure to prevent infinite loop
        setAccessToken(null);
        throw await parseError(retryRes);
      }
      return parseBody<T>(retryRes);
    }

    // Refresh failed — clear token
    setAccessToken(null);
    throw await parseError(res);
  }

  if (!res.ok) {
    throw await parseError(res);
  }

  return parseBody<T>(res);
}

async function parseError(res: Response): Promise<Error> {
  try {
    const body = await res.json();
    return new Error(body.message || `Request failed with status ${res.status}`);
  } catch {
    return new Error(`Request failed with status ${res.status}`);
  }
}
