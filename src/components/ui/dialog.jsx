import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function Dialog({ open, onOpenChange, children, ...props }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </DialogPrimitive.Root>
  )
}

function DialogTrigger(props) {
  return <DialogPrimitive.Trigger {...props} />
}

function DialogPortal({ children, ...props }) {
  return <DialogPrimitive.Portal {...props}>{children}</DialogPrimitive.Portal>
}

function DialogBackdrop({ className, ...props }) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function DialogPopup({ className, children, showClose = true, ...props }) {
  return (
    <DialogPrimitive.Popup
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 text-card-foreground shadow-2xl border border-border/70 duration-200 outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Fechar"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  )
}

function DialogContent({ className, children, showClose = true, ...props }) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPopup className={className} showClose={showClose} {...props}>
        {children}
      </DialogPopup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 text-left mb-4", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6", className)}
      {...props}
    />
  )
}

function DialogClose(props) {
  return <DialogPrimitive.Close {...props} />
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
}
