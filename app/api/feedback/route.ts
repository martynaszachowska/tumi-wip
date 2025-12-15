import { Resend } from "resend";

function htmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  const form = await req.formData();

  const payload = {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    message: String(form.get("message") || ""),
    createdAt: new Date().toISOString(),
  };

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL; // e.g. "martyna@twojadomena.pl"
  const FROM_EMAIL = process.env.FROM_EMAIL || "Tumi <onboarding@resend.dev>";

  // If configured -> send email; else fallback to logs
  try {
    if (RESEND_API_KEY && TO_EMAIL) {
      const resend = new Resend(RESEND_API_KEY);

      const subject = `Tumi WIP — nowa sugestia${payload.name ? ` od ${payload.name}` : ""}`;
      const safe = {
        name: htmlEscape(payload.name),
        email: htmlEscape(payload.email),
        message: htmlEscape(payload.message),
        createdAt: htmlEscape(payload.createdAt),
      };

      await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: payload.email || undefined,
        subject,
        html: `
          <div style="font-family: ui-sans-serif, system-ui; line-height: 1.45">
            <h2>Nowa sugestia z Tumi (WIP)</h2>
            <p><b>Imię:</b> ${safe.name || "-"}</p>
            <p><b>Email:</b> ${safe.email || "-"}</p>
            <p><b>Data:</b> ${safe.createdAt}</p>
            <hr/>
            <p style="white-space: pre-wrap"><b>Wiadomość:</b><br/>${safe.message}</p>
          </div>
        `,
      });

      return new Response(null, { status: 302, headers: { Location: "/?sent=1#kontakt" } });
    }

    console.log("TUMI_FEEDBACK (no email configured):", payload);
    return new Response(null, { status: 302, headers: { Location: "/?sent=1#kontakt" } });
  } catch (err) {
    console.error("TUMI_FEEDBACK_ERROR:", err);
    // still redirect so UX is smooth
    return new Response(null, { status: 302, headers: { Location: "/?sent=1#kontakt" } });
  }
}
