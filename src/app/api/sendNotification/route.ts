import webpush from "web-push";

export async function POST(req: Request) {
  const body = await req.json();

  const { subscription, notificationPayload } = body;

  await webpush.sendNotification(
    JSON.parse(subscription),
    JSON.stringify(notificationPayload)
  );

  return new Response("success");
}
