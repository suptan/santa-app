import '@testing-library/jest-dom'
import { server } from "./__mocks__/rest/server";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
