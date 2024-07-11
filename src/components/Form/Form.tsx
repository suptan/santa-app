import { useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import { FormProps, FormState } from "./Form.types";

function Form({
  children,
  className,
  isValid,
  validation,
  onError,
  onSubmit,
}: FormProps) {
  const [contextState, setContextState] = useState<FormState>({
    disabled: false,
    error: {},
    isValidating: false,
  });

  const handleChange = () => {
    setContextState((prev) => ({
      ...prev,
      isValidating: true,
    }));
  };

  useEffect(() => {
    setContextState((prev) => ({
      ...prev,
      disabled: !contextState.error,
    }));

    if (contextState.error) {
      onError?.();
    }
  }, [contextState.error]);

  useEffect(() => {
    // TODO: investigate performance issue
    if (contextState.isValidating) {
      const validationResult = children?.reduce((data, child) => {
        const { name, validation } = child.props;
        if (name) {
          data[name] = child.props.validation?.() || false;
        }

        return data;
      }, [] as Record<string, boolean>[]);

      setContextState((prev) => ({
        ...prev,
        error: validationResult,
        isValidating: false,
      }));
    }
  }, [contextState.isValidating]);

  return (
    <FormContext.Provider value={contextState}>
      <form className={className} onChange={handleChange} onSubmit={onSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export { Form };
