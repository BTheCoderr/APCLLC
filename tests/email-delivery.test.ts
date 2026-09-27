import { describe, expect, it, vi } from "vitest";
import type { Resend } from "resend";
import { sendEmail } from "../src/lib/send-email";
import {
  isDuplicateSubmission,
  releaseSubmission,
  resetSubmissionGuardForTests,
} from "../src/lib/form-guard";

const email = {
  from: "APC LLC <info@apcllc.co>",
  to: "info@apcllc.co",
  subject: "Test quote",
  html: "<p>Test</p>",
};

describe("email delivery", () => {
  it("requires an accepted message ID before reporting delivery success", async () => {
    const send = vi.fn().mockResolvedValueOnce({ data: { id: "email-1" }, error: null });
    const resend = { emails: { send } } as unknown as Resend;
    await expect(sendEmail(resend, email)).resolves.toBe("email-1");
  });

  it("rejects a Resend error response that does not throw", async () => {
    const send = vi.fn().mockResolvedValueOnce({
      data: null,
      error: { name: "validation_error", message: "Domain not verified" },
    });
    const resend = { emails: { send } } as unknown as Resend;
    await expect(sendEmail(resend, email)).rejects.toThrow("Resend rejected email");
  });

  it("allows a retry when a failed send releases its duplicate guard", () => {
    resetSubmissionGuardForTests();
    expect(isDuplicateSubmission("quote-1")).toBe(false);
    releaseSubmission("quote-1");
    expect(isDuplicateSubmission("quote-1")).toBe(false);
  });
});
