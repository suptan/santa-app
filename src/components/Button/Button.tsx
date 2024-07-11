import classnames from "classnames";
import {
  MouseEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { ButtonProps } from "./Button.types";

const Button = forwardRef(function Button(
  {
    children,
    className,
    color,
    disabled,
    href,
    type = "button",
    onClick,
  }: ButtonProps,
  forwardRef
) {
  const classes = classnames("py-2 px-4 rounded [&[disabled]]:bg-slate-200", {
    ["bg-green-600 text-white hover:bg-green-500"]: color === "primary",
    ["bg-red-600 text-white hover:bg-red-500"]: color === "secondary",
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const Root = href ? "a" : "button";

  useImperativeHandle(forwardRef, () => buttonRef.current as HTMLElement);

  const handleOnClick = (e: MouseEventHandler) => {
    if (disabled) {
      return;
    }

    onClick?.(e);
  };

  return (
    <Root
      ref={buttonRef}
      className={classes}
      disabled={disabled}
      type={type}
      onClick={handleOnClick}
    >
      {children}
    </Root>
  );
});

export { Button }