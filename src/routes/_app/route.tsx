import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Splash } from "@/components/store-hydration";
import { useReliefStore } from "@/lib/store";

export const Route = createFileRoute("/_app")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const hydrated = useReliefStore((s) => s._hydrated);
  const currentUser = useReliefStore((s) => s.currentUser);

  if (!hydrated) {
    return <Splash />;
  }

  // Without auth, we just ensure they have a profile selected
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
