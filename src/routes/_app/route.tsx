import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Splash } from "@/components/store-hydration";
import { useReliefStore } from "@/lib/store";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { authEnabled } from "@/lib/auth/client";

export const Route = createFileRoute("/_app")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const hydrated = useReliefStore((s) => s._hydrated);
  const dbUsers = useReliefStore((s) => s.users);
  const currentUser = useReliefStore((s) => s.currentUser);
  const loginAs = useReliefStore((s) => s.loginAs);

  const { user: authUser, isPending } = useCurrentUserState();

  // If auth is enabled, ensure store's currentUser is synced with session
  useEffect(() => {
    if (authEnabled && authUser && !isPending) {
      const profile = dbUsers.find((u) => u.id === authUser.id);
      if (profile && (!currentUser || currentUser.id !== authUser.id)) {
        loginAs(authUser.id);
      }
    }
  }, [authEnabled, authUser, isPending, dbUsers, currentUser, loginAs]);

  if (!hydrated || (authEnabled && isPending)) {
    return <Splash />;
  }

  if (authEnabled) {
    if (!authUser) {
      return <RedirectToSignIn />;
    }
    const profile = dbUsers.find((u) => u.id === authUser.id);
    if (!profile) {
      // Authenticated but has no profile, send to home (/) to complete registration
      return <Navigate to="/" />;
    }
  } else {
    // Auth disabled fallback logic
    if (!currentUser) {
      return <Navigate to="/" />;
    }
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
