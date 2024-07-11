import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components";

describe("<Button>", () => {
  it.each`
    color          | disabled | type
    ${"primary"}   | ${false} | ${"primary"}
    ${"primary"}   | ${true}  | ${"disabled primary"}
    ${"secondary"} | ${false} | ${"secondary"}
    ${"secondary"} | ${true}  | ${"disabled secondary"}
  `("should render as $type button", ({ color, disabled }) => {
    const { container } = render(
      <Button color={color} disabled={disabled}>
        ${color.charAt(0).toUpperCase() + color.slice(1)}
      </Button>
    );
    expect(container).toMatchSnapshot();
  });

  describe("onClick", () => {
    const mockClick = jest.fn();
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should execute callback function onClick", async () => {
      render(<Button onClick={mockClick}>text</Button>);
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it("should not allow click event when dislabed", async () => {
      render(
        <Button onClick={mockClick} disabled>
          text
        </Button>
      );
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(mockClick).toHaveBeenCalledTimes(0);
    });
  });

  it("should render as link button when given href", () => {
    const { container } = render(
      <Button href="http://anywhere.gov">Link</Button>
    );
    expect(container).toMatchSnapshot();
  });
});
