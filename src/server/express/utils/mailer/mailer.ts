import nodemailer from "nodemailer";
import { SendMailParams } from "./mailer.types";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "",
  port: Number(process.env.EMAIL_PORT) || 0,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

async function sendMail({
  from = process.env.EMAIL_SENDER_NO_REPLY || "",
  to,
  subject = "Hello ✔",
  body,
}: SendMailParams) {
  await retry(async () => {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: body,
    });
    // sent success event to log service
    console.log("msg sent", info);
  });
}

async function retry(callback: () => void, maxRetry = 3) {
  for (let i = 0; i < maxRetry; i++) {
    try {
      await callback();
      return;
    } catch (e) {
      // send error to log service
      if (i === maxRetry - 1) {
        // push failed message to recovery queue and attempted to send again
        throw new Error("failed to send email");
      }
    }
  }
}

export { transporter, sendMail };
