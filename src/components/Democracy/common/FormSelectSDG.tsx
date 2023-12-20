/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore

import * as lodash from "lodash";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { InputProps } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/contexts/AppContext";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
} & Omit<InputProps, "name">;

const FormSelectSDG = <TFormValues extends Record<string, unknown>>({
  control,
  name,
}: FormInputProps<TFormValues>): JSX.Element => {
  const { sdgData } = useAppContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>By SDGs</FormLabel>
          <FormControl>
            <Select
              {...field}
              onValueChange={(value) => field.onChange(value)}
              value={field.value && Number(field.value)}
            >
              <SelectTrigger className="rounded-full bg-transparent h-12 border-subtle_text text-[12px] text-subtle_text focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select a goal" />
              </SelectTrigger>
              <SelectContent>
                {sdgData?.map((sdg) => (
                  <SelectItem value={sdg.id} key={sdg.id}>
                    {sdg.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectSDG;
