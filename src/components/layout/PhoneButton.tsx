import { Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { cn } from "@/lib/utils";

interface PhoneButtonProps {
  variant?: "default" | "hero" | "footer";
  className?: string;
}

export function PhoneButton({ variant = "default", className }: PhoneButtonProps) {
  return (
    <a
      href={`tel:${BUSINESS.phoneHref}`}
      className={cn(
        "inline-flex items-center gap-2 font-medium transition-colors",
        variant === "default" &&
          "rounded-lg bg-amber px-5 py-2.5 text-sm text-white hover:bg-amber-light",
        variant === "hero" &&
          "rounded-lg bg-amber px-8 py-4 text-lg text-white shadow-lg hover:bg-amber-light hover:shadow-xl",
        variant === "footer" &&
          "text-stone-300 hover:text-white",
        className
      )}
    >
      <Phone className={cn("shrink-0", variant === "hero" ? "h-5 w-5" : "h-4 w-4")} />
      <span>{BUSINESS.phone}</span>
    </a>
  );
}
