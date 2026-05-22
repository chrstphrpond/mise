"use client";

import { useState, useTransition } from "react";
import { createMenuItem } from "../actions";
import { Plus, X } from "lucide-react";

export function AddItemDialog({ categories }: { categories: string[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function submit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await createMenuItem(formData);
        setOpen(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to add item");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 h-11 text-sm font-medium hover:bg-primary-70 shadow-[0_8px_24px_-12px_rgba(162,123,92,0.6)]"
      >
        <Plus className="size-4" />
        Add item
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-ink-title">Add menu item</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 hover:bg-surface-muted"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <form action={submit} className="mt-5 space-y-3.5">
              <Field label="Name" name="name" required placeholder="Flat White" />
              <Field
                label="Category"
                name="category"
                required
                list="cat-options"
                placeholder="Coffee & Beverages"
              />
              <datalist id="cat-options">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Price (USD)"
                  name="priceDollars"
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="4.50"
                />
                <Field
                  label="Stock"
                  name="stock"
                  required
                  type="number"
                  min="0"
                  defaultValue="0"
                />
              </div>
              <Field
                label="Modifiers (optional)"
                name="modifiers"
                placeholder="Milk: Full, Oat, Almond | Size: Reg, Large"
                hint="Format: GroupName: opt1, opt2 | Group2: opt1, opt2"
              />
              {error ? (
                <p className="text-xs text-red-600">{error}</p>
              ) : null}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 h-10 text-sm text-ink-muted hover:bg-surface-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 h-10 text-sm font-medium hover:bg-primary-70 disabled:opacity-60"
                >
                  {isPending ? "Adding…" : "Add item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  hint,
  ...props
}: {
  label: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-ink-muted mb-1">
        {label}
      </span>
      <input
        {...props}
        className="block w-full rounded-xl border-0 bg-surface-cream px-3 h-10 text-sm text-ink-title placeholder:text-ink-muted/60 ring-1 ring-line focus:ring-primary/40 focus:bg-white focus:outline-none transition-colors"
      />
      {hint ? <span className="block mt-1 text-[11px] text-ink-muted">{hint}</span> : null}
    </label>
  );
}
