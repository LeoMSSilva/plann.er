import type { ComponentProps } from "react";

import { type VariantProps, tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium",
  variants: {
    variant: {
      primary: "text-lime-950 bg-lime-300 hover:bg-lime-400",
      secondary: "text-zinc-200 bg-zinc-800 hover:bg-zinc-700",
    },
    size: {
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export function Button({ children, variant, size, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={buttonVariants({ variant: variant, size: size })}
    >
      {children}
    </button>
  );
}
