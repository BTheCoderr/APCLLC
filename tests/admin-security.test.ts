import { describe, expect, it, beforeEach } from "vitest";
import { GET as getQuotes } from "../src/app/api/admin/quotes/route";
import { GET as getContacts } from "../src/app/api/admin/contacts/route";
import { adminBearerIsValid } from "../src/lib/admin-auth";
import { rateLimit, resetRateLimitForTests } from "../src/lib/rate-limit";
import {
  isDuplicateSubmission,
  resetSubmissionGuardForTests,
  submissionFingerprint,
} from "../src/lib/form-guard";

describe("admin API authorization", () => {
  beforeEach(() => {
    delete process.env.ADMIN_API_KEY;
    resetRateLimitForTests();
  });

  it("rejects unauthenticated quote listing", async () => {
    const response = await getQuotes(new Request("http://localhost/api/admin/quotes"));
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
  });

  it("rejects unauthenticated contact listing", async () => {
    const response = await getContacts(new Request("http://localhost/api/admin/contacts"));
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
  });

  it("rejects the previously hardcoded client bearer token", async () => {
    process.env.ADMIN_API_KEY = "server-only-test-key";
    const response = await getQuotes(
      new Request("http://localhost/api/admin/quotes", {
        headers: { Authorization: "Bearer apcllc2024adminapi" },
      })
    );
    expect(response.status).toBe(401);
  });

  it("rejects requests when ADMIN_API_KEY is unset even with a bearer token", async () => {
    const response = await getQuotes(
      new Request("http://localhost/api/admin/quotes", {
        headers: { Authorization: "Bearer anything" },
      })
    );
    expect(response.status).toBe(401);
  });

  it("accepts only the server ADMIN_API_KEY", () => {
    process.env.ADMIN_API_KEY = "server-only-test-key";
    expect(adminBearerIsValid("Bearer server-only-test-key")).toBe(true);
    expect(adminBearerIsValid("Bearer wrong")).toBe(false);
    expect(adminBearerIsValid(null)).toBe(false);
  });

  it("allows a valid server-side bearer", async () => {
    process.env.ADMIN_API_KEY = "server-only-test-key";
    resetRateLimitForTests();
    const response = await getQuotes(
      new Request("http://localhost/api/admin/quotes", {
        headers: { Authorization: "Bearer server-only-test-key" },
      })
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.submissions)).toBe(true);
  });

  it("rate-limits repeated unauthorized admin attempts", async () => {
    for (let i = 0; i < 8; i += 1) {
      const response = await getQuotes(new Request("http://localhost/api/admin/quotes"));
      expect(response.status).toBe(401);
    }
    const blocked = await getQuotes(new Request("http://localhost/api/admin/quotes"));
    expect(blocked.status).toBe(429);
  });
});

describe("form duplicate and rate-limit helpers", () => {
  beforeEach(() => {
    resetSubmissionGuardForTests();
    resetRateLimitForTests();
  });

  it("flags a repeated quote fingerprint inside the window", () => {
    const fingerprint = submissionFingerprint({
      email: "preview-test@example.com",
      phone: "4015550100",
      serviceType: "cargoTransport",
      pickupLocation: "02886",
      deliveryLocation: "02101",
    });
    expect(isDuplicateSubmission(fingerprint, 60_000, 1_000)).toBe(false);
    expect(isDuplicateSubmission(fingerprint, 60_000, 2_000)).toBe(true);
  });

  it("allows traffic under the rate limit and blocks after it", () => {
    expect(rateLimit("ip", 2, 10_000, 0).ok).toBe(true);
    expect(rateLimit("ip", 2, 10_000, 1).ok).toBe(true);
    expect(rateLimit("ip", 2, 10_000, 2).ok).toBe(false);
  });
});
