import { Button } from "./Button";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

/**
 * Compact quantity stepper reused by product and cart experiences.
 */
export function QuantitySelector({ value, onChange, min = 1 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-[#2A2A2A]">
      <Button variant="ghost" className="h-11 w-11 border-0 px-0" onClick={() => onChange(Math.max(min, value - 1))}>
        -
      </Button>
      <span className="w-12 text-center text-sm text-white">{value}</span>
      <Button variant="ghost" className="h-11 w-11 border-0 px-0" onClick={() => onChange(value + 1)}>
        +
      </Button>
    </div>
  );
}
