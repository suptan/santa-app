import { http, HttpResponse } from "msw";

const wishRests = [
  http.post("/api/wish", () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export { wishRests };
