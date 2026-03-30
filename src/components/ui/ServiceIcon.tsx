import {
  PanelTopClose,
  Layers,
  Armchair,
  UtensilsCrossed,
  Truck,
  Fence,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PanelTopClose,
  Layers,
  Armchair,
  UtensilsCrossed,
  Truck,
  Fence,
};

interface ServiceIconProps {
  name: string;
  className?: string;
}

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={cn("h-6 w-6", className)} />;
}
