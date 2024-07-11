import { FormEventHandler, ReactNode } from "react";

interface FormState {
  disabled: boolean
  error: object;
  isValidating: boolean;
}

interface FormProps {
  children: ReactNode[];
  className?: string;
  isValid?: boolean;
  validation?: string[]
  onError?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export type { FormState, FormProps };
