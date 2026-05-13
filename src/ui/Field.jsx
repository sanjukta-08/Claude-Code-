/**
 * Form field primitives — Input, Textarea, Select, with consistent label + hint + error.
 */

export function Field({ label, hint, error, optional, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost uppercase">
            {label}
            {required && <span className="text-signal-red ml-1">*</span>}
            {optional && <span className="text-bone-ghost/50 ml-1.5">· optional</span>}
          </span>
          {hint && <span className="font-mono text-[9.5px] tracking-wide2 text-bone-ghost">{hint}</span>}
        </div>
      )}
      {children}
      {error && <div className="mt-1.5 font-mono text-[10px] tracking-wide2 text-signal-red">{error}</div>}
    </label>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full h-11 px-3.5 rounded-lg bg-ink-800/80 border border-white/[0.08]
        font-body text-[14px] text-bone placeholder-bone-ghost
        focus:outline-none focus:border-gold/50 focus:bg-ink-800
        transition-colors duration-200 ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = '', rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full p-3.5 rounded-lg bg-ink-800/80 border border-white/[0.08]
        font-body text-[14px] text-bone placeholder-bone-ghost leading-[1.65]
        focus:outline-none focus:border-gold/50 focus:bg-ink-800
        transition-colors duration-200 resize-y ${className}`}
      {...props}
    />
  )
}

export function MonoInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full h-11 px-3.5 rounded-lg bg-ink-800/80 border border-white/[0.08]
        font-mono text-[12.5px] text-bone placeholder-bone-ghost
        focus:outline-none focus:border-gold/50 focus:bg-ink-800
        transition-colors duration-200 ${className}`}
      {...props}
    />
  )
}
