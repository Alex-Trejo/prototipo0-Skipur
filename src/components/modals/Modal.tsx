import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  open?: boolean
  onClose?: () => void
}

export function Modal({ children, open = false, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <dialog
      className="fixed w-dvw h-dvh inset-0 z-50 backdrop-blur-xs flex items-center justify-center bg-black/30 p-20"
      tabIndex={-1}
    >
      {children}
    </dialog>
  )
}
