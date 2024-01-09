/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as lodash from "lodash";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input, InputProps } from "../../ui/input";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
           <h3 className="text-sm md:text-base text-text">{label}</h3>
          <p className="text-[12px] text-dark -tracking-[0.28px]">
            {description}
          </p>
          <FormControl>
            {/* @ts-ignore */}
            <Input
              placeholder={placeholder}
              {...field}
              className={`focus-visible:ring-1 bg-[#C4C4C41F] ${
                hasError ? "focus-visible:ring-red-500" : "focus-visible:ring-primary"
              } focus-visible:ring-offset-2 border-transparent  h-12 rounded-full px-4 text-sm md:text-base`}
              {...props}
            />
          </FormControl>
          <FormMessage className="text-xs md:text-sm"/>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
