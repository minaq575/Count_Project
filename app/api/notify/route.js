import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message } = await request.json();
    const token = process.env.LINE_NOTIFY_TOKEN;

    if (!message) {
      return NextResponse.json({ error: "Missing required field (message)" }, { status: 400 });
    }

    const response = await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ message })
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    return NextResponse.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
