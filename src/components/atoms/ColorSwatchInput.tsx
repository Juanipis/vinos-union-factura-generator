import { Input } from '../ui/input'
import { Label } from '../ui/label'

type ColorSwatchInputProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorSwatchInput({
  id,
  label,
  value,
  onChange,
}: ColorSwatchInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs text-slate-200">
        {label}
      </Label>
      <Input
        id={id}
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 cursor-pointer border-slate-600 bg-slate-900 p-1"
      />
    </div>
  )
}
