import type { EmailTask } from "./email.types";
import { sendMail } from "../utils/mailer";

async function sendEmail(task: EmailTask) {
  sendMail({
    to: task.reciever,
    subject: "Hello ✔",
    body: task.body,
  });
}

export { sendEmail };
