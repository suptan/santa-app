import { ChangeEvent, useState, FocusEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import equal from "fast-deep-equal";
import { Button, Form, Input, Loader } from "@/components";
import { post } from "@/utils/httpClient";
import { idRegex } from "@/utils/string";
import { useDebounce } from "@/hooks";
import { WishFormState } from "./Wish.types";

// TODO: save message to local storage and load for next session
function Wish() {
  const defaultState = {
    msg: "",
    name: "",
  };
  const [isValid, setIsValid] = useState(false);
  const [inputs, setInputs] = useState<WishFormState & Record<string, string>>(
    defaultState
  );
  const [isLoading, setIsLoading] = useState(false);
  const debounceInputs = useDebounce<Record<string, string>>(inputs, 500);
  const isDirty = !equal(inputs, defaultState);

  const handleFormError = () => {
    setIsValid(false);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setIsValid(true);
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const format = value.trim();

    if (value === format) {
      return;
    }

    setInputs((prev) => ({ ...prev, [name]: format }));
  };

  const handleResetForm = () => {
    setInputs(defaultState);
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await post("api/wish", debounceInputs);
      toast.success("Your wish will be fulfilled.");
      handleResetForm();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Loader active={isLoading} overlay />
      <h2 className="text-4xl font-bold mb-4 dark:text-white">
        Make a wish to Santa
      </h2>
      <Form
        className="mb-4 flex flex-col gap-2 border rounded p-2"
        isValid={isValid}
        onError={handleFormError}
        onSubmit={e=>handleOnSubmit}
      >
        <Input
          label="ID:"
          name="name"
          value={inputs.name}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          validation={() => {
            const isValid = idRegex.test(inputs.name);

            return !isValid && 'Enter alphanumeric and "()+=.-_"';
          }}
          required
          inputProps={{
            maxLength: 50,
            placeholder: "Good boys and girls",
          }}
        />
        <Input
          type="textarea"
          label="Message:"
          name="msg"
          value={inputs.msg}
          onChange={handleOnChange}
          inputProps={{
            placeholder: "What do you want for Christmas?",
          }}
          required
        />
        <section className="flex gap-2">
          <Button color="secondary" onClick={handleResetForm}>
            Clear
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={!isDirty}
            onClick={handleOnSubmit}
          >
            Submit
          </Button>
        </section>
      </Form>
    </section>
  );
}

export { Wish };
