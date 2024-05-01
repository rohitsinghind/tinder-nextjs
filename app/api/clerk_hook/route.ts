import prisma from "@/lib/database";
import { Webhook } from "svix";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";

async function validateWebhook(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(process.env.WEBHOOK_SECRET as string);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  console.log("webhook received");
  const payload = await validateWebhook(request);

  if (payload.type === "user.updated") {
    await prisma.user.update({
      where: {
        clerk_id: payload.data.id,
      },
      data: {
        name: payload.data.first_name + " " + payload.data.last_name,
        email: payload.data.email_addresses[0].email_address,
        imgUrl: payload.data.image_url,
      },
    });
  }

  if (payload.type === "user.created") {
    await prisma.user.create({
      data: {
        clerk_id: payload.data.id,
        name: payload.data.first_name + " " + payload.data.last_name,
        email: payload.data.email_addresses[0].email_address,
        imgUrl: payload.data.image_url,
      },
    });
    console.log("User created");
  }

  return new Response("Webhook received", { status: 200 });
}
