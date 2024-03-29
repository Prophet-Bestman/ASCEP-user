import * as React from "react";
import { IoClose } from "react-icons/io5";
import { FormInput } from "..";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

interface AnswerOptionsProps {
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  error: string | null;
}

export default function AnswerOptions({
  options,
  setOptions,
  error,
}: AnswerOptionsProps) {
  const [option, setOption] = React.useState("");

  const handleAdd = (option: string) => {
    if (options.find((item) => item.toLowerCase() === option.toLowerCase())) {
      return toast({
        title: "Error",
        description: "Option already exists",
        variant: "error",
      });
    }
    setOptions((options) => [...options, option]);
    setOption("");
  };

  const handleRemove = (tag: string) => {
    setOptions((options) =>
      options.filter((value) => value.toLowerCase() !== tag.toLowerCase())
    );
  };

  return (
    <div className="relative w-full space-y-4">
      <div className="flex gap-2 items-end">
        <FormInput
          name="option"
          description=""
          placeholder="Enter the option"
          onChange={(e) => setOption(e.target.value)}
          value={option}
        />
        <Button
          className="w-fit h-fit rounded-md"
          type="button"
          onClick={() => handleAdd(option)}
          disabled={option === ""}
        >
          Add Option
        </Button>
      </div>
      {error && <FormMessage>{error}</FormMessage>}
      <div className="flex flex-wrap gap-2 ">
        <span className="text-base text-text">Options:</span>
        {options.map((option, i) => (
          <Options option={option} key={i} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

interface OptionsProps {
  option: string;
  handleRemove: (option: string) => void;
}

const Options = ({ option, handleRemove }: OptionsProps) => {
  return (
    <div className="top-0 left-0 flex h-full gap-1 p-1 px-2 text-xs text-white transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit">
      {option}
      <IoClose
        className="text-base cursor-pointer"
        onClick={() => handleRemove(option)}
      />
    </div>
  );
};
