import {
  adminBearerIsValid,
  getClientIp,
  tooManyAttemptsResponse,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";

export function guardAdminRequest(request: Request): Response | null {
  const ip = getClientIp(request);
  const limited = rateLimit(`admin:${ip}`, 8, 15 * 60 * 1000);
  if (!limited.ok) {
    return tooManyAttemptsResponse();
  }

  if (!adminBearerIsValid(request.headers.get("authorization"))) {
    return unauthorizedResponse();
  }

  return null;
}
