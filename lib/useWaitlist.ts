import { useState, type FormEvent } from "react";
import { workEmailError } from "./companyEmail";

export type WaitlistStatus = "idle" | "loading" | "success" | "error";

/** Email + submit state for the waitlist. Each design renders its own form around it. */
export function useWaitlist({ onSuccess }: { onSuccess?: (email: string) => void } = {}) {
  const [email, setEmailValue] = useState("");
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [error, setError] = useState("");

  function setEmail(value: string) {
    setEmailValue(value);
    if (status === "error") setStatus("idle");
  }

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    const value = email.trim();
    const invalid = workEmailError(value);
    if (invalid) {
      setStatus("error");
      setError(invalid);
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: window.location.pathname }),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus("success");
      onSuccess?.(value);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return {
    email,
    setEmail,
    status,
    error,
    submit,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
