import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Use service role for server-side inserts (bypasses RLS write restrictions safely)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      email,
      name,
      goal,
      blocker,
      willingness_to_pay,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    } = body;

    // Basic server-side validation
    if (!email || !goal || !blocker || !willingness_to_pay) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from("signups").insert([
      {
        email: email.trim().toLowerCase(),
        name: name?.trim() || null,
        goal,
        blocker,
        willingness_to_pay,
        referrer: referrer || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_term: utm_term || null,
        utm_content: utm_content || null,
      },
    ]);

    if (dbError) {
      // Handle duplicate email gracefully
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the list." },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your signup. Please try again." },
        { status: 500 }
      );
    }

    // Send confirmation email (non-blocking — don't fail signup if email fails)
    try {
      if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
        await resend.emails.send({
          from: `Winter Arc <${process.env.RESEND_FROM_EMAIL}>`,
          to: email,
          subject: "You're on the list — Winter Arc Founding Cohort",
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Winter Arc — You're on the list</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #1e1e1e;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#e8a830;text-transform:uppercase;">WINTER ARC</p>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding:40px 0 24px;">
              <h1 style="margin:0;font-size:32px;font-weight:900;color:#ffffff;letter-spacing:-0.03em;line-height:1.1;">
                You&apos;re on the list.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 16px;font-size:16px;color:#888;line-height:1.7;">
                ${name ? `Hey ${name},<br/><br/>` : ""}
                We&apos;ve got your spot reserved for the Winter Arc founding cohort.
              </p>
              <p style="margin:0 0 16px;font-size:16px;color:#888;line-height:1.7;">
                Your goal: <strong style="color:#e8a830;">${goal}</strong>
              </p>
              <p style="margin:0;font-size:16px;color:#888;line-height:1.7;">
                We&apos;re building the first version now. The founding cohort will be small — 50 people max. You&apos;ll be among the first we reach out to when we&apos;re ready to open.
              </p>
            </td>
          </tr>

          <!-- Divider card -->
          <tr>
            <td style="padding:24px;background:#111;border:1px solid #1e1e1e;margin-bottom:32px;">
              <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.15em;color:#555;text-transform:uppercase;">WHAT HAPPENS NEXT</p>
              <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                No payment is collected now. When the founding cohort opens, we&apos;ll email you directly. You&apos;ll have the option to confirm your spot at <strong style="color:#ccc;">$12 for your first 90-day Arc</strong>.
              </p>
            </td>
          </tr>

          <tr><td style="height:32px;"></td></tr>

          <!-- Quote -->
          <tr>
            <td style="padding:0 0 40px;">
              <p style="margin:0;font-size:15px;color:#e8a830;font-style:italic;line-height:1.6;">
                &ldquo;90 days is long enough to change something real. Short enough to commit to.&rdquo;
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1a1a1a;padding-top:24px;">
              <p style="margin:0;font-size:11px;color:#333;line-height:1.6;">
                Winter Arc &nbsp;&middot;&nbsp; winterarc.com<br/>
                You received this because you signed up at winterarc.com.<br/>
                This is a one-time confirmation. We won&apos;t spam you.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email send error (non-fatal):", emailErr);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Signup route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
