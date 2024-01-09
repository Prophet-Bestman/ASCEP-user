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

import { FormControl, FormField, FormMessage, FormItem } from "../../ui/form";
import { InputProps } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { CloseCircle, GalleryAdd } from "iconsax-react";

type FormImageInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  selectedImage: File | null;
} & Omit<InputProps, "name">;

const FormImageInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  setSelectedImage,
  selectedImage,
  ...props
}: FormImageInputProps<TFormValues>): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <p className="text-dark text-[14px]">{description}</p>
            <FormControl>
              <Button
                type="button"
                className="w-full max-w-[300px] p-0 flex justify-center items-center"
              >
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  onBlur={field.onBlur}
                  name={field.name}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                    setSelectedImage(e.target.files?.[0] ?? null);
                  }}
                  ref={field.ref}
                  {...props}
                  key={selectedImage ? selectedImage.name : "fileInput"}
                />
                <label
                  htmlFor="fileInput"
                  className="flex gap-2 items-center justify-center cursor-pointer w-full h-full"
                >
                  <GalleryAdd variant="Bold" size={30} />
                  <span className="whitespace-nowrap capitalize">
                    Add image
                  </span>
                </label>
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* IMAGE PREVIEW */}
      {selectedImage && (
        <div className="w-[150px]">
          <p className="text-base my-1">Image preview</p>
          <div className="relative h-[150px] w-[150px]">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <CloseCircle
              className="absolute top-1 right-0 text-primary p-0 h-fit w-fit cursor-pointer"
              size={24}
              onClick={() => {
                setSelectedImage(null);
              }}
              variant="Bold"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormImageInput;
