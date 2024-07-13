import type { ComponentProps } from "react";

interface ModalContainerProps extends ComponentProps<"div"> {}

export function ModalContainer({ children }: ModalContainerProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-left">
      <div className="w-max[640px] px-6 py-5 space-y-5 rounded-xl shadow-shape bg-zinc-900">
        {children}
      </div>
    </div>
  );
}
