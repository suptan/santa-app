import { ChangeEventHandler, FocusEventHandler, InputHTMLAttributes } from "react";

export interface InputProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  // Attributes applied to the input element
  inputProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  label?: string;
  name?: string;
  required?: boolean;
  value?: number | string;
  validation?: (value: number | string) => string | boolean;
  type?: "text" | "textarea";
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
