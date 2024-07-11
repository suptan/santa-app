// import * as nodemailer from "nodemailer";
import { faker } from "@faker-js/faker";
import { transporter, sendMail } from "@/server/express/utils/mailer";

// const mockSendMail = jest.fn();

// jest.mock("nodemailer");

// nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });
// console.log('mock')
// jest.mock("nodemailer", () => ({
//   __esModule: true,
//   default: {
//     createTransport: jest.fn(() => ({
//       sendMail: mockSendMail,
//     })),
//   },
// }));

describe("utils/mailer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runAllTimers();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should sent email to given address", async () => {
    const spySendMail = jest
      .spyOn(transporter, "sendMail")
      .mockResolvedValue("email send");
    const mockAddress = faker.string.alpha(12);
    const mockBody = faker.string.alphanumeric(100);

    await sendMail({ to: mockAddress, body: mockBody });
    expect(spySendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.any(String),
        to: mockAddress,
        subject: expect.any(String),
        text: mockBody,
      })
    );
  });

  it("should retry to sent email upto 3 times", async () => {
    jest
      .spyOn(transporter, "sendMail")
      .mockResolvedValue("email send")
      .mockRejectedValueOnce(new Error())
      .mockRejectedValueOnce(new Error());

    await sendMail({ to: faker.string.alpha(4), body: faker.string.alpha(8) });
    expect(null).toBeNull();
  });

  it("should throw error when failed to sent an email", async () => {
    jest.spyOn(transporter, "sendMail").mockRejectedValue(new Error());

    await expect(sendMail({ to: "", body: "" })).rejects.toThrow(
      "failed to send email"
    );
  });
});
