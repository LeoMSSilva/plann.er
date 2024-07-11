import { X } from "lucide-react";
import type { ComponentProps } from "react";

interface ModalContainerProps extends ComponentProps<"div"> {
  handleToggle: (state: boolean) => void;
  title: string;
}

export function ModalHeaderContainer({
  children,
  title,
  handleToggle,
}: ModalContainerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <X
          className="size-5 text-zinc-400"
          onClick={() => handleToggle(false)}
        />
      </div>
      {children}
    </div>
  );
}
