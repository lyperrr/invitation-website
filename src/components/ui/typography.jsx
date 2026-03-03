/** @format */

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const typographyVariants = cva("text-muted-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
      h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground/80",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      muted: "text-muted-foreground text-sm",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

const Typography = ({ variant = "p", className, children, as, ...props }) => {
  const elementMap = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    p: "p",
    blockquote: "blockquote",
    muted: "p",
  };

  const Component = as || elementMap[variant] || "p";

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
