import request from "supertest";
import fetch from "node-fetch";
import { faker } from "@faker-js/faker";
import { initializeUser, initializeUserProfile } from "../express/user";
import { sendMail } from "../express/utils/mailer";
import { app } from "../express/server";
import { memoryCache } from "../express/cache";

jest.mock("../express/utils/mailer", () => ({
  sendMail: jest.fn(),
}));
// node-fetch is not friendly with msw
jest.mock("node-fetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("POST /api/wish", () => {
  const defaultUsers = [
    { username: "foo", uid: "730b04" },
    { username: "john.cena", uid: "730b06a6" },
  ];
  const defaultProfiles = [
    {
      userUid: "730b0412",
      address: `${faker.location.zipCode()}, ${faker.location.streetAddress(
        true
      )}`,
      birthdate: faker.date.past({ years: 10 }),
    },
    {
      userUid: "730b06a6",
      address: `${faker.location.zipCode()}, ${faker.location.streetAddress(
        true
      )}`,
      birthdate: faker.date.past({ years: 10 }),
    },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    memoryCache.reset();
    jest.runAllTimers();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should create a new wish", async () => {
    fetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve(defaultUsers),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(defaultProfiles),
      });
    await initializeUser();
    await initializeUserProfile();
    const mockName = "john.cena";
    const mockMessage = "gift";
    const res = await request(app)
      .post("/api/wish")
      .send({ name: mockName, msg: mockMessage })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(204);

    jest.advanceTimersByTime(16000);

    expect(sendMail).toBeCalledWith(
      expect.objectContaining({
        to: "santa@northpole.com",
        subject: expect.stringContaining("Hello"),
        body: expect.stringMatching(
          /^child username: john.cena\nchild address:.+\nrequest: gift$/
        ),
      })
    );
  });

  it("should return 401 when given unauthorized user", async () => {
    const res = await request(app)
      .post("/api/wish")
      .send({ name: "no.one", msg: faker.string.alpha(10) })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(401);
  });

  describe("Request Validation", () => {
    it("should return 400 when request body is empty", async () => {
      const res = await request(app).post("/api/wish").send(null);
      expect(res.status).toEqual(400);
    });

    it("should return 400 when username is too long", async () => {
      const res = await request(app)
        .post("/api/wish")
        .send({ name: faker.string.alpha(51), msg: faker.string.alpha(10) })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(res.status).toEqual(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: expect.arrayContaining([
            expect.objectContaining({
              message:
                '"name" length must be less than or equal to 50 characters long',
              type: "string.max",
            }),
          ]),
        })
      );
    });

    it("should return 400 when message is too long", async () => {
      const res = await request(app)
        .post("/api/wish")
        .send({ name: faker.string.alpha(11), msg: faker.string.alpha(60001) })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(res.status).toEqual(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: expect.arrayContaining([
            expect.objectContaining({
              message: expect.stringContaining("msg"),
              type: "string.max",
            }),
          ]),
        })
      );
    });
  });
});
