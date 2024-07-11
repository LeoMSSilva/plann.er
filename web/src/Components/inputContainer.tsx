import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const inputContainerVariants = tv({
  base: "h-16 px-4 flex gap-3 items-center rounded-xl shadow-shape",
  variants: {
    variant: {
      primary: "bg-zinc-900",
      secondary: "bg-zinc-950 max-h-12",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface IInputContainerProps
  extends ComponentProps<"div">,
    VariantProps<typeof inputContainerVariants> {}

export function InputContainer({ children, variant }: IInputContainerProps) {
  return (
    <div className={inputContainerVariants({ variant: variant })}>
      {children}
    </div>
  );
}
