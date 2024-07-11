import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import toast from "react-hot-toast";
import { Wish } from "@/components";
import { server } from "@/../__mocks__/rest/server";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("<Wish>", () => {
  const usernamePlaceholder = "Good boys and girls";
  const wishPlaceholder = "What do you want for Christmas?";
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render with blank form", () => {
    const { container } = render(<Wish />);
    expect(container).toMatchSnapshot();
  });

  it("should display success message", async () => {
    render(<Wish />);
    await userEvent.type(
      screen.getByPlaceholderText(usernamePlaceholder),
      "username1"
    );
    await userEvent.type(
      screen.getByPlaceholderText(wishPlaceholder),
      "Mr. Santa, I wish for the happiness."
    );
    await userEvent.click(screen.getByText("Submit"));
    expect(toast.success).toHaveBeenCalledWith("Your wish will be fulfilled.");
  }, 15000);

  it("should display unauthorized error", async () => {
    server.use(
      http.post(
        "/api/wish",
        () => {
          throw new HttpResponse(null, { status: 401 });
        },
        { once: true }
      )
    );
    render(<Wish />);
    await userEvent.type(
      screen.getByPlaceholderText(usernamePlaceholder),
      "rnadom"
    );
    await userEvent.type(screen.getByPlaceholderText(wishPlaceholder), "none");
    await userEvent.click(screen.getByText("Submit"));
    expect(toast.error).toHaveBeenCalledWith("Unauthorized");
  }, 15000);
});
