import type { ComponentProps } from "react";

interface LayoutProps extends ComponentProps<"div"> {}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full flex flex-col space-y-10 px-6 text-center">
        {children}
      </div>
    </div>
  );
}
