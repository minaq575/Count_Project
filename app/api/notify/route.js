import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, reportData } = await request.json();
    const token = process.env.LINE_NOTIFY_TOKEN;

    if (!message || !reportData) {
      return NextResponse.json({ error: "Missing required fields (message or reportData)" }, { status: 400 });
    }

    // Construct the notification message with report data
    const facultyDetails = reportData.facultyData.map(f => 
      `${f.name}:
      รับแล้ว: ${f.received},
      คงเหลือ: ${f.remaining},
     [${f.percentage}] %
     .............`
    ).join('\n');

    const notificationMessage = 
      `${message}\n
      ภาพรวม\n
      รับแล้ว: ${reportData.current}\n
      คงเหลือ: ${reportData.totalSum - reportData.current}\n
      เปอร์เซ็นต์: ${reportData.overviewPercentage}%\n
      ----------------------
      รอบเช้า\n
      รับแล้ว: ${reportData.morning}\n
      คงเหลือ: ${reportData.remainingMorning}\n
      เปอร์เซ็นต์: ${reportData.morningPercentage}%\n
      ----------------------
      รอบบ่าย\n
      รับแล้ว: ${reportData.afternoon > 0 ? reportData.current - reportData.morning : 0}\n
      คงเหลือ: ${reportData.remainingAfternoon}\n
      เปอร์เซ็นต์: ${reportData.afternoonPercentage}%\n
      ----------------------
      คณะ\n
      ${facultyDetails}`
    ;

    const response = await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ message: notificationMessage })
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