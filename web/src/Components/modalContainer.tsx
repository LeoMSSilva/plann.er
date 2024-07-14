import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const modalVariants = tv({
  base: "px-6 py-5 space-y-5 rounded-xl shadow-shape bg-zinc-900",
  variants: {
    size: {
      full: "w-[640px]",
      fit: "",
    },
  },
  defaultVariants: {
    size: "full",
  },
});

interface ModalContainerProps
  extends ComponentProps<"div">,
    VariantProps<typeof modalVariants> {}

export function ModalContainer({ children, size }: ModalContainerProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-left">
      <div className={modalVariants({ size: size })}>{children}</div>
    </div>
  );
}
