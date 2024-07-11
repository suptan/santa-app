import { createContext, useContext } from "react";
import { FormState } from "./Form.types";

const FormContext = createContext<FormState>();

function useFormContext() {
  return useContext(FormContext);
}

export { FormContext, useFormContext };
