import { sendSingleEmail, sendSingleSMS } from "@/lib/notification-service";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const { emails, msg } = await req.json()

    if (!emails || !msg) return NextResponse.json({ message: "Data missing" }, { status: 400 })

    try {
        const uniqueEmails = [
            ...new Set(
                emails.flatMap((item: any) => [item.email, item.parent_email]).filter(Boolean)
            ),
        ];



        await Promise.all(
            uniqueEmails.map(async (eachEmail) => {
                try {
                    const formattedMsg = msg
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(
                            /(https?:\/\/[^\s]+)/g,
                            '<a href="$1" target="_blank">$1</a>'
                        )
                        .replace(/\n/g, "<br/>");
                    const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Notification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">
      
      <h2 style="margin-bottom:20px;">Hello 👋</h2>

      <p style="font-size:16px; line-height:1.6;">
        ${formattedMsg}
      </p>

      <p style="margin-top:24px; font-size:16px;">
        If you have any questions, feel free to reach out to our support team.
      </p>

      <p style="margin-top:30px; font-size:16px; font-weight:bold;">
        — Advanced Physical and Technical Training Team
      </p>

    </div>

  </body>
</html>
`;
                    await sendSingleEmail(message, "Notification", eachEmail as string);
                } catch (error: any) {
                    console.log(`Failed for ${eachEmail}:`, error?.message);
                }
            })
        );
        return NextResponse.json({ message: "Done" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Server Error" }, { status: 200 })
    }

}