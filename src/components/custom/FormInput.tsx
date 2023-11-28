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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReactNode, useState } from "react";
import { Input, InputProps } from "../ui/input";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  rightElement,
  leftElement,
  errors,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;

  const [show, setShow] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <div className="relative ">
            {leftElement && (
              <div className="absolute top-0 w-10 bg-[#F5F5f5] flex items-center h-full px-4 rounded-l-[20px] ">
                {leftElement}
              </div>
            )}
            <FormControl>
              {/* @ts-ignore */}
              <Input
                className={`bg-[#F5F5F5] text-base text-text focus-visible:ring-2 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium ${
                  hasError
                    ? "focus-visible:ring-red-500 ring-red-500 ring-2"
                    : "focus-visible:ring-primary"
                } ${leftElement ? "pl-12" : "pl-[18px]"}  ${
                  rightElement ? "pr-12" : "pr-[18px]"
                }`}
                placeholder={placeholder}
                type={
                  props?.type === "password"
                    ? show
                      ? "text"
                      : "password"
                    : props?.type
                }
                {...field}
              />
            </FormControl>
            {(leftElement || props.type === "password") && (
              <div className="absolute rounded-r-[20px] bg-[#f5f5f5] top-0 flex items-center h-full pr-4 pl-1 right-0 ">
                {props.type === "password" ? (
                  <p
                    className="cursor-pointer text-subtle_text"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? "Hide" : "Show"}
                  </p>
                ) : (
                  rightElement
                )}
              </div>
            )}
          </div>
          {hasError && (
            <FormMessage className="px-4 text-xs">
              {errorMessage.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormInput;
