import cron from "node-cron";
import twilio from "twilio";
import { prisma } from "../lib/prisma.js";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export function startReminderCron() {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = new Date();

      // Find notes where reminder time has passed, SMS hasn't been sent yet
      const dueNotes = await prisma.note.findMany({
        where: {
          reminderDate: { lte: now },
          smsSent: false,
        },
        include: {
          user: true,
        },
      });

      for (const note of dueNotes) {
        // Skip if user has no phone number saved in their profile
        if (!note.user || !note.user.phoneNumber) {
          continue;
        }

        // Send SMS via Twilio
        await client.messages.create({
          body: `⏰ Reminder! Note: "${note.noteName}"- It's time for your scheduled work!`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: note.user.phoneNumber, // get the user's profile phone number
        });

        // Mark note as SMS sent so it doesn't trigger again
        await prisma.note.update({
          where: { id: note.id },
          data: { smsSent: true },
        });

        console.log(
          `Reminder SMS successfully sent to ${note.user.phoneNumber} for note: ${note.noteName}`,
        );
      }
    } catch (error) {
      console.error("Error in reminder cron job:", error);
    }
  });
}
