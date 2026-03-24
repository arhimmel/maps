import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiFetch, setAccessToken, getAccessToken } from "./api";

describe("api", () => {
  beforeEach(() => {
    setAccessToken(null);
    vi.restoreAllMocks();
  });

  describe("setAccessToken / getAccessToken", () => {
    it("stores and retrieves the access token", () => {
      expect(getAccessToken()).toBeNull();
      setAccessToken("test-token");
      expect(getAccessToken()).toBe("test-token");
    });

    it("clears the token when set to null", () => {
      setAccessToken("test-token");
      setAccessToken(null);
      expect(getAccessToken()).toBeNull();
    });
  });

  describe("apiFetch", () => {
    it("sends request to /api prefix", async () => {
      const mockResponse = { data: "test" };
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify(mockResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );

      const result = await apiFetch("/health");
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        "/api/health",
        expect.objectContaining({ credentials: "include" })
      );
    });

    it("includes Bearer token when set", async () => {
      setAccessToken("my-token");
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({}), { status: 200 })
      );

      await apiFetch("/maps");
      const call = vi.mocked(fetch).mock.calls[0];
      const headers = call[1]?.headers as Headers;
      expect(headers.get("Authorization")).toBe("Bearer my-token");
    });

    it("throws on non-OK response with error message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Not found" }), { status: 404 })
      );

      await expect(apiFetch("/missing")).rejects.toThrow("Not found");
    });

    it("attempts silent refresh on 401 when token exists", async () => {
      setAccessToken("expired-token");
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      // First call returns 401
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
      );
      // Refresh call succeeds
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: "new-token" }), { status: 200 })
      );
      // Retry succeeds
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: "refreshed" }), { status: 200 })
      );

      const result = await apiFetch("/protected");
      expect(result).toEqual({ data: "refreshed" });
      expect(getAccessToken()).toBe("new-token");
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    it("clears token when refresh fails", async () => {
      setAccessToken("expired-token");
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      // First call returns 401
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
      );
      // Refresh fails
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Invalid refresh" }), { status: 401 })
      );

      await expect(apiFetch("/protected")).rejects.toThrow("Unauthorized");
      expect(getAccessToken()).toBeNull();
    });

    it("clears token when retry after refresh also returns 401", async () => {
      setAccessToken("expired-token");
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      // First call returns 401
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
      );
      // Refresh succeeds
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: "new-token" }), { status: 200 })
      );
      // Retry ALSO returns 401 (permissions revoked)
      fetchSpy.mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Forbidden" }), { status: 401 })
      );

      await expect(apiFetch("/protected")).rejects.toThrow("Forbidden");
      expect(getAccessToken()).toBeNull();
    });

    it("handles 204 No Content responses", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(null, { status: 204 })
      );

      const result = await apiFetch("/maps/123");
      expect(result).toBeUndefined();
    });

    it("does not set Content-Type for FormData bodies", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({}), { status: 200 })
      );

      const formData = new FormData();
      formData.append("file", "test");
      await apiFetch("/upload", { method: "POST", body: formData });

      const call = vi.mocked(fetch).mock.calls[0];
      const headers = call[1]?.headers as Headers;
      expect(headers.has("Content-Type")).toBe(false);
    });
  });
});
