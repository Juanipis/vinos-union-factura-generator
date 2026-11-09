import { useRef } from 'react'
import { Upload } from 'lucide-react'

type LogoUploaderProps = {
  logoUrl: string | null
  onUpload: (file: File) => void
}

export function LogoUploader({ logoUrl, onUpload }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) {
            onUpload(file)
          }
        }}
      />
      <div
        className="logo-box"
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            inputRef.current?.click()
          }
        }}
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="logo-img" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-xs text-slate-400">
            <Upload className="h-4 w-4" />
            <span>Click para Logo</span>
          </div>
        )}
      </div>
    </div>
  )
}
