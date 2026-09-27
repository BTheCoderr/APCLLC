// Form notifications go to the owner's monitored inbox. Netlify can override it
// without changing the public contact address or the verified sender domain.
export const APC_NOTIFICATION_EMAIL =
  process.env.APC_NOTIFICATION_EMAIL?.trim() || "bferrell514@gmail.com";
