import { createQueueWithBatchConsumer } from "simple-in-memory-queue";
import { Task } from "./task.types";
import { sendEmail } from "./email";

export * from "./email.types";
export * from "./task.types";

const queue = createQueueWithBatchConsumer<Task>({
  threshold: {
    milliseconds: Number(process.env.QUEUE_THRESHOLD_TIMER) || 10 * 1000,
    size: Number(process.env.QUEUE_THRESHOLD_SIZE) || 10,
  },
  consumer: ({ items }) => {
    items.forEach((item) => {
      switch (item.type) {
        case "email":
          sendEmail(item.message);
          break;
        default:
          break;
      }
    });
  },
});

export { queue };
