import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Handshake, Landmark, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  RESOURCE_LABEL,
  ROLE_LABEL,
  type ResourceType,
  type Role,
} from "@/lib/types";
import { cn, formatNumber, selectClass } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: LoginPage });

const ROLES: {
  id: Role;
  title: string;
  copy: string;
  icon: typeof Handshake;
}[] = [
  {
    id: "donor",
    title: "Donor",
    copy: "Fund or ship what camps actually need.",
    icon: Handshake,
  },
  {
    id: "receiver",
    title: "Receiver",
    copy: "Post requirements and surplus from a camp.",
    icon: Landmark,
  },
  {
    id: "coordinator",
    title: "Coordinator",
    copy: "Match, move, and audit every transfer.",
    icon: Truck,
  },
];

const RESOURCES = Object.keys(RESOURCE_LABEL) as ResourceType[];

const DEMOS: { id: string; name: string; meta: string }[] = [
  { id: "u-ananya", name: "Ananya Rao", meta: "Donor · Bengaluru" },
  { id: "u-ravi", name: "Ravi Menon", meta: "Receiver · Camp Sundari" },
  { id: "u-leila", name: "Leila Hassan", meta: "Coordinator · Kaveri Basin" },
];

function LoginPage() {
  const [fieldMode, setFieldMode] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [contributionType, setContributionType] =
    useState<ResourceType>("food");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !name.trim()) return;
    alert(`Signed up as ${name} (${role})`);
  };

  const enter = (userId: string) => {
    alert(`Logged in as demo user ${userId}`);
  };

  const enterDemo = (r: Role) => {
    alert(`Using demo ${r}`);
  };

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="h-0.5 bg-accent" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-[var(--space-page)] py-4">
        <div className="flex items-center gap-2">
          <span className="grid size-6 grid-cols-2 gap-0.5" aria-hidden>
            <span className="bg-fg" />
            <span className="bg-fg" />
            <span className="bg-fg" />
            <span className="bg-accent" />
          </span>
          <span className="text-sm font-semibold tracking-[0.14em]">
            RELIETNET
          </span>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-muted">
          Field mode
          <Switch
            checked={fieldMode}
            onCheckedChange={setFieldMode}
            aria-label="Field mode"
          />
        </label>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-[var(--space-page)] pt-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <section className="rn-enter">
          <p className="text-[11px] font-medium tracking-[0.2em] text-muted uppercase">
            Kaveri Basin · live network
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Disaster relief, coordinated.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Donors, camps, and coordinators on one ledger. Priority is scored.
            Every packet leaves a trail.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-3">
            <HeroStat k="People at risk" v={formatNumber(0)} />
            <HeroStat k="Critical posts" v={0} tone="critical" />
            <HeroStat k="Active transfers" v={0} />
          </dl>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium tracking-wide uppercase">
            <Legend c="bg-critical" l="Critical" />
            <Legend c="bg-high" l="High" />
            <Legend c="bg-moderate" l="Moderate" />
            <Legend c="bg-low" l="Low" />
          </ul>
        </section>

        <section className="rn-enter-2 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Enter the network
          </h2>
          <p className="mt-1 text-sm text-muted">
            Choose a role, or jump in with a seeded identity.
          </p>
          <div className="mt-5 grid gap-2">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const on = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "flex min-h-14 items-center gap-3 rounded-lg px-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150",
                    on ? "bg-fg text-bg" : "bg-bg hover:shadow-[var(--shadow-border-hover)]",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>
                    <span className="block text-sm font-semibold">{r.title}</span>
                    <span
                      className={cn(
                        "block text-xs",
                        on ? "opacity-70" : "text-muted",
                      )}
                    >
                      {r.copy}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {role ? (
            <form className="mt-5 grid gap-3" onSubmit={submit}>
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>
              {role === "receiver" ? (
                <>
                  <div className="grid gap-1.5">
                    <Label htmlFor="org">Camp / organisation</Label>
                    <Input
                      id="org"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                      placeholder="Camp Sundari"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="loc">Location</Label>
                    <Input
                      id="loc"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      placeholder="East Bank"
                    />
                  </div>
                </>
              ) : null}
              {role === "donor" ? (
                <div className="grid gap-1.5">
                  <Label htmlFor="pref">Preferred contribution</Label>
                  <select
                    id="pref"
                    value={contributionType}
                    onChange={(e) =>
                      setContributionType(e.target.value as ResourceType)
                    }
                    className={selectClass}
                  >
                    {RESOURCES.map((k) => (
                      <option key={k} value={k}>
                        {RESOURCE_LABEL[k]}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              {role === "coordinator" ? (
                <div className="grid gap-1.5">
                  <Label htmlFor="region">Assigned region</Label>
                  <Input
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                    placeholder="Kaveri Basin"
                  />
                </div>
              ) : null}
              <Button type="submit" variant="primary" className="cursor-pointer">
                Create {ROLE_LABEL[role].toLowerCase()} identity
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => enterDemo(role)}
              >
                Use demo {ROLE_LABEL[role].toLowerCase()}
              </Button>
            </form>
          ) : (
            <p className="mt-5 text-sm text-muted">Select a role to continue.</p>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
              Quick demo
            </p>
            <div className="mt-2 grid gap-2">
              {DEMOS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => enter(d.id)}
                  className="flex min-h-12 items-center justify-between rounded-lg bg-bg px-3 text-left shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
                >
                  <span className="text-sm font-medium">{d.name}</span>
                  <span className="text-xs text-muted">{d.meta}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function HeroStat({
  k,
  v,
  tone,
}: {
  k: string;
  v: string | number;
  tone?: "critical";
}) {
  return (
    <div className="rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
      <dt className="text-[11px] tracking-wide text-subtle uppercase">{k}</dt>
      <dd
        className={cn(
          "mt-1 font-mono text-2xl font-semibold tracking-tight tabular sm:text-3xl",
          tone === "critical" && "text-critical",
        )}
      >
        {v}
      </dd>
    </div>
  );
}

function Legend({ c, l }: { c: string; l: string }) {
  return (
    <li className="flex items-center gap-1.5 text-muted">
      <span className={cn("size-2 rounded-full", c)} />
      {l}
    </li>
  );
}
