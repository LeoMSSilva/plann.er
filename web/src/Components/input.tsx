import type { ComponentProps } from "react";

interface IInputProps extends ComponentProps<"input"> {
  setValue: (state: string) => void;
}

export function Input({ children, setValue, ...rest }: IInputProps) {
  function handleOnChange(newState: string) {
    setValue(newState);
  }

  return (
    <div className="flex gap-2 items-center flex-1">
      {children}
      <input
        {...rest}
        className="text-lg outline-none bg-transparent placeholder-zinc-400 flex-1"
        onChange={(event) => handleOnChange(event.target.value)}
      />
    </div>
  );
}
