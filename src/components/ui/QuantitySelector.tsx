import { Button } from "./Button";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

/**
 * Compact quantity stepper reused by product and cart experiences.
 */
export function QuantitySelector({ value, onChange, min = 1, max }: QuantitySelectorProps) {
  const atMax = max !== undefined && value >= max;
  const atMin = value <= min;

  return (
    <div className="flex items-center" style={{ border: '1px solid rgba(11,11,11,0.08)' }}>
      <Button
        variant="ghost"
        className="h-11 w-11 border-0 px-0"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={atMin}
      >
        -
      </Button>
      <span className="w-12 text-center text-sm site-heading">{value}</span>
      <Button
        variant="ghost"
        className="h-11 w-11 border-0 px-0"
        onClick={() => onChange(Math.min(max ?? Infinity, value + 1))}
        disabled={atMax}
      >
        +
      </Button>
    </div>
  );
}