import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components";

describe("<Input>", () => {
  it.each`
    type
    ${"input"}
    ${"textarea"}
  `("should render as $type", ({ type }) => {
    const { container } = render(<Input type={type} />);
    expect(container).toMatchSnapshot();
  });
});
