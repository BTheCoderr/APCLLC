const recentSubmissions = new Map<string, number>();

export function submissionFingerprint(input: {
  email: string;
  phone: string;
  serviceType?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  message?: string;
}): string {
  return [
    input.email.trim().toLowerCase(),
    input.phone.trim(),
    input.serviceType?.trim() || "",
    input.pickupLocation?.trim().toLowerCase() || "",
    input.deliveryLocation?.trim().toLowerCase() || "",
    input.message?.trim().toLowerCase() || "",
  ].join("|");
}

export function isDuplicateSubmission(
  fingerprint: string,
  windowMs = 120_000,
  now = Date.now()
): boolean {
  const previous = recentSubmissions.get(fingerprint);
  if (previous && now - previous < windowMs) {
    return true;
  }
  recentSubmissions.set(fingerprint, now);
  return false;
}

export function resetSubmissionGuardForTests(): void {
  recentSubmissions.clear();
}

export const PUBLIC_FORM_ERROR =
  "We could not send your request. Please call or text APC and we will take the details directly.";
