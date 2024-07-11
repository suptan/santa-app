import classnames from "classnames";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { InputProps } from "./Input.types";
import { useFormContext } from "../Form";

export const Input = forwardRef(function Input(
  {
    className,
    disabled,
    inputProps = {},
    label,
    name,
    required,
    value,
    type,
    onBlur,
    onChange,
    onFocus,
  }: InputProps,
  forwardRef
) {
  const { className: inputClassName, ...restInputProps } = inputProps;
  const classes = classnames("flex flex-col gap-1 text-gray-400", className);
  const inputClasses = classnames("bg-transparent p-2 w-full", inputClassName);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const formContext = useFormContext();
  const InputComponent = type === "textarea" ? "textarea" : "input";
  const isRequiredError = useMemo(
    () => {
      if (!required) {
        return false;
      }

      if (typeof value === "string") {
        value.length && /^\s*$/.test(value)
      }

      if (typeof value === "number") {
        return isNaN(value);
      }

      return true
    },
    [required, value]
  );

  useImperativeHandle(forwardRef, () => inputRef.current, [inputRef]);

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="border border-zinc-200 rounded bg-transparent">
        <InputComponent
          ref={inputRef}
          aria-labelledby={name}
          className={inputClasses}
          disabled={disabled}
          id={name}
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          {...restInputProps}
        />
      </div>
      {formContext?.error[name] && (
        <span className="text-red-500">{formContext.error[name]}</span>
      )}
    </div>
  );
});
