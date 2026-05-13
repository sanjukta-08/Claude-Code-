export function Field({ label, hint, error, optional, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="font-mono text-[9.5px] tracking-wide3 text-coffee uppercase">
            {label}
            {required && <span className="text-crimson ml-1">*</span>}
            {optional && <span className="text-coffee-dim ml-1.5">· optional</span>}
          </span>
          {hint && <span className="font-mono text-[9.5px] tracking-wide2 text-coffee-dim">{hint}</span>}
        </div>
      )}
      {children}
      {error && <div className="mt-1.5 font-mono text-[10px] tracking-wide2 text-crimson">{error}</div>}
    </label>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full h-11 px-3.5 rounded-lg bg-cream border border-noir/12
        font-sans text-[14px] text-noir placeholder-coffee-dim
        focus:outline-none focus:border-crimson/50 focus:bg-paper
        transition-colors duration-200 ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = '', rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full p-3.5 rounded-lg bg-cream border border-noir/12
        font-sans text-[14px] text-noir placeholder-coffee-dim leading-[1.65]
        focus:outline-none focus:border-crimson/50 focus:bg-paper
        transition-colors duration-200 resize-y ${className}`}
      {...props}
    />
  )
}

export function MonoInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full h-11 px-3.5 rounded-lg bg-cream border border-noir/12
        font-mono text-[12.5px] text-noir placeholder-coffee-dim
        focus:outline-none focus:border-crimson/50 focus:bg-paper
        transition-colors duration-200 ${className}`}
      {...props}
    />
  )
}
