import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authEnabled, signIn, authClient } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-bg text-fg">
        <span className="grid size-10 grid-cols-2 gap-1 animate-pulse" aria-hidden>
          <span className="bg-fg" />
          <span className="bg-fg" />
          <span className="bg-fg" />
          <span className="bg-accent" />
        </span>
        <p className="mt-4 text-xs font-semibold tracking-[0.2em]">RELIETNET</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }
    if (isSignUp && !name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim(),
        });
        if (error) {
          toast.error(error.message || "Failed to create account.");
        } else {
          toast.success("Account created successfully!");
          navigate({ to: "/" });
        }
      } else {
        const { error } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (error) {
          toast.error(error.message || "Invalid email or password.");
        } else {
          toast.success("Signed in successfully!");
          navigate({ to: "/" });
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (providerId: string) => {
    try {
      await signIn(providerId, { callbackURL: "/" });
    } catch (err: any) {
      toast.error(err?.message || "Sign-in failed");
    }
  };

  return (
    <div className="min-h-dvh bg-bg text-fg flex flex-col justify-between">
      <div className="h-0.5 bg-accent w-full" />
      
      <header className="mx-auto w-full max-w-6xl px-[var(--space-page)] py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="grid size-6 grid-cols-2 gap-0.5" aria-hidden>
            <span className="bg-fg" />
            <span className="bg-fg" />
            <span className="bg-fg" />
            <span className="bg-accent" />
          </span>
          <span className="text-sm font-semibold tracking-[0.14em]">RELIETNET</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-6 py-12 flex-grow flex items-center justify-center">
        <div className="w-full rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] border border-border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted mt-1">
              {isSignUp
                ? "Join the coordinated disaster relief ledger."
                : "Sign in to coordinate disaster relief resources."}
            </p>
          </div>

          {/* Social Sign In */}
          {authEnabled && GROK_PROVIDERS.length > 0 && (
            <div className="grid gap-2 mb-6">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  variant="outline"
                  onClick={() => handleOAuth(p.providerId)}
                  className="w-full flex justify-center items-center gap-2 cursor-pointer"
                >
                  Continue with {p.label}
                </Button>
              ))}
              <div className="relative my-4 flex items-center">
                <div className="flex-grow border-t border-border" />
                <span className="mx-4 text-xs text-muted font-medium uppercase tracking-wider">Or email</span>
                <div className="flex-grow border-t border-border" />
              </div>
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
                    <UserIcon className="size-4" />
                  </span>
                  <Input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="login-email">Email Address</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
                  <Mail className="size-4" />
                </span>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted">
                  <Lock className="size-4" />
                </span>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full flex justify-center items-center gap-2 cursor-pointer mt-6"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          {/* Switch Tab Option */}
          <div className="text-center mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-accent hover:underline font-medium cursor-pointer"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account yet? Create one"}
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-subtle">
        ReliefNet © {new Date().getFullYear()} · Ledger coordinates verified.
      </footer>
    </div>
  );
}
