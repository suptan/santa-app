//@jest-environment node
import { post } from "@/utils/httpClient";

describe("httpClient", () => {
  afterEach(() => {
    // jest.restoreAllMocks();
    global.fetch.mockClear();
  });
  afterAll(() => {
    delete global.fetch;
  });

  // describe('GET METHOD')
  describe("POST METHOD", () => {
    // let fetchMock = jest.spyOn(global, "fetch");
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it("should return 200", async () => {
      global.fetch.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => "sample",
        })
      );
      const mockUrl = "http://domain.server/example";
      const mockBody = { id: 12, check: true, ract: [1, 2, 3] };

      const result = await post(mockUrl, mockBody);

      expect(global.fetch).toHaveBeenCalledWith(
        mockUrl,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(mockBody),
        })
      );
      expect(result).toBe("sample");
    });

    it("should return null when return status is 204", async () => {
      global.fetch.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 204,
        })
      );

      const result = await post("", {});

      expect(result).toBeNull();
    });

    it("should handle empty response when return status is not 204", async () => {
      global.fetch.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 201,
        })
      );

      const result = await post("", {});

      expect(JSON.stringify(result)).toBe("{}");
    });

    it.each`
      code   | message
      ${401} | ${'Unauthorized'}
      ${404} | ${"The service is temporary unavailable, please try again later."}
      ${500} | ${"The service is temporary unavailable, please try again later."}
    `("should throw auth error when return status is $code", async ({ code, message}) => {
      global.fetch.mockImplementation(() =>
        Promise.resolve({
          ok: false,
          status: code,
        })
      );

      await expect(post("", {})).rejects.toThrow(message);
    });
  });
  // describe('PUT METHOD')
});
