import request from "supertest";
import { app } from "../express/server";

describe("GET /api/health", () => {
  it("should return server status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "OK",
        timestamp: expect.any(Number),
        uptime: expect.any(Number),
      })
    );
  });
});
