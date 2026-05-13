export function Field({ label, hint, error, optional, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost uppercase">
            {label}
            {required && <span className="text-orange ml-1">*</span>}
            {optional && <span className="text-ink-ghost/60 ml-1.5">· optional</span>}
          </span>
          {hint && <span className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost">{hint}</span>}
        </div>
      )}
      {children}
      {error && <div className="mt-1.5 font-mono text-[10px] tracking-wide2 text-ruby">{error}</div>}
    </label>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full h-11 px-3.5 rounded-md bg-canvas border border-line
        font-sans text-[14px] text-ink placeholder-ink-ghost
        focus:outline-none focus:border-orange focus:bg-canvas
        transition-colors duration-200 ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = '', rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full p-3.5 rounded-md bg-canvas border border-line
        font-sans text-[14px] text-ink placeholder-ink-ghost leading-[1.65]
        focus:outline-none focus:border-orange focus:bg-canvas
        transition-colors duration-200 resize-y ${className}`}
      {...props}
    />
  )
}

export function MonoInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full h-11 px-3.5 rounded-md bg-canvas border border-line
        font-mono text-[12.5px] text-ink placeholder-ink-ghost
        focus:outline-none focus:border-orange focus:bg-canvas
        transition-colors duration-200 ${className}`}
      {...props}
    />
  )
}
