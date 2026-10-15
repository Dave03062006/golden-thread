import { useEffect, useId, useRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import './components.css'

type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger'

export function Button({
  variant = 'secondary',
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button type={type} className={['ui-button', className].filter(Boolean).join(' ')} data-variant={variant} {...props} />
}

export function Panel({ children, className, ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLElement>) {
  return (
    <section className={['ui-panel', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </section>
  )
}

/** An on/off switch. It's a real checkbox underneath, so keyboards and screen readers understand it. */
export function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="ui-toggle">
      <span className="ui-toggle-text">
        <span>{label}</span>
        {description && <small>{description}</small>}
      </span>
      <input
        type="checkbox"
        role="switch"
        aria-checked={checked}
        className="ui-switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  )
}

/** Pick one of a few options. Real radio buttons underneath, shown as segments. */
export function Choice<T extends string>({
  legend,
  description,
  value,
  options,
  onChange,
}: {
  legend: string
  description?: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  const name = useId()
  return (
    <fieldset className="ui-choice">
      <legend>
        {legend}
        {description && (
          <>
            <br />
            <small>{description}</small>
          </>
        )}
      </legend>
      <div className="ui-choice-options">
        {options.map((option) => (
          <label key={option.value} className="ui-choice-option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * A modal dialog, using the browser's own <dialog>. It keeps keyboard focus inside while
 * open and closes with Escape.
 */
export function Dialog({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog || typeof dialog.showModal !== 'function') return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={ref} className="ui-dialog" aria-labelledby={titleId} onClose={onClose}>
      {open && (
        <Panel>
          <h2 id={titleId}>{title}</h2>
          {children}
        </Panel>
      )}
    </dialog>
  )
}
