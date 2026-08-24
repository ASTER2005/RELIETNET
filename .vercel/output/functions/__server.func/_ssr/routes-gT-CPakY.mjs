import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Landmark, i as Truck, v as Handshake } from "../_libs/lucide-react.mjs";
import { t as Switch } from "./switch-7mJ33n82.mjs";
import { n as Input, r as Label, t as Button } from "./label-C4XT45Y8.mjs";
import { h as formatNumber, i as Splash, m as cn, p as useReliefStore, s as RESOURCE_LABEL, v as selectClass } from "./router-ClfUIAXn.mjs";
import { t as useCurrentUserState } from "./use-current-user-Bi-OxCGF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-gT-CPakY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	{
		id: "donor",
		title: "Donor",
		copy: "Fund or ship what camps actually need.",
		icon: Handshake
	},
	{
		id: "receiver",
		title: "Receiver",
		copy: "Post requirements and surplus from a camp.",
		icon: Landmark
	},
	{
		id: "coordinator",
		title: "Coordinator",
		copy: "Match, move, and audit every transfer.",
		icon: Truck
	}
];
var RESOURCES = Object.keys(RESOURCE_LABEL);
function LoginPage() {
	const hydrated = useReliefStore((s) => s._hydrated);
	useReliefStore((s) => s.currentUser);
	const dbUsers = useReliefStore((s) => s.users);
	const fieldMode = useReliefStore((s) => s.fieldMode);
	const toggleFieldMode = useReliefStore((s) => s.toggleFieldMode);
	const loginAs = useReliefStore((s) => s.loginAs);
	const signup = useReliefStore((s) => s.signup);
	const requirements = useReliefStore((s) => s.requirements);
	const transactions = useReliefStore((s) => s.transactions);
	const navigate = useNavigate();
	const { user: authUser, isPending: authPending } = useCurrentUserState();
	const [role, setRole] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [orgName, setOrgName] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [region, setRegion] = (0, import_react.useState)("");
	const [contributionType, setContributionType] = (0, import_react.useState)("food");
	(0, import_react.useEffect)(() => {
		if (authUser && !name) setName(authUser.displayName || "");
	}, [authUser, name]);
	(0, import_react.useEffect)(() => {
		if (authUser && !authPending) {
			if (dbUsers.find((u) => u.id === authUser.id)) {
				loginAs(authUser.id);
				navigate({ to: "/dashboard" });
			}
		}
	}, [
		true,
		authUser,
		authPending,
		dbUsers,
		loginAs,
		navigate
	]);
	const stats = (0, import_react.useMemo)(() => {
		return {
			people: requirements.reduce((a, r) => a + r.peopleAffected, 0),
			critical: requirements.filter((r) => r.priority === "critical" && r.status !== "fulfilled").length,
			active: transactions.filter((t) => t.stage !== "confirmed" && t.stage !== "pending").length
		};
	}, [requirements, transactions]);
	if (!hydrated || authPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	const submit = (e) => {
		e.preventDefault();
		if (!role || !name.trim()) return;
		signup({
			name: name.trim(),
			role,
			orgName: role === "receiver" ? orgName : void 0,
			location: role === "receiver" ? location : void 0,
			region: role === "coordinator" ? region : void 0,
			contributionType: role === "donor" ? contributionType : void 0
		}, authUser ? authUser.id : void 0);
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 bg-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-[var(--space-page)] py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "grid size-6 grid-cols-2 gap-0.5",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-accent" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold tracking-[0.14em]",
						children: "RELIETNET"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-xs font-medium text-muted",
					children: ["Field mode", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: fieldMode,
						onCheckedChange: () => toggleFieldMode(),
						"aria-label": "Field mode"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-[var(--space-page)] pt-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rn-enter",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.2em] text-muted uppercase",
							children: "Kaveri Basin · live network"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl",
							children: "Disaster relief, coordinated."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-base leading-relaxed text-muted",
							children: "Donors, camps, and coordinators on one ledger. Priority is scored. Every packet leaves a trail."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-10 grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
									k: "People at risk",
									v: formatNumber(stats.people)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
									k: "Critical posts",
									v: stats.critical,
									tone: "critical"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
									k: "Active transfers",
									v: stats.active
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium tracking-wide uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									c: "bg-critical",
									l: "Critical"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									c: "bg-high",
									l: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									c: "bg-moderate",
									l: "Moderate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									c: "bg-low",
									l: "Low"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rn-enter-2 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
					children: !authUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-8 flex flex-col justify-center min-h-[300px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold tracking-tight",
								children: "Access the Ledger"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted max-w-sm mx-auto leading-relaxed",
								children: "Connect your identity to access requirements, register surplus, or initiate donations on the ReliefNet network."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "primary",
								onClick: () => navigate({ to: "/login" }),
								className: "w-full mt-8 flex justify-center items-center gap-2 cursor-pointer",
								children: "Connect Identity"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold tracking-tight",
							children: "Complete your Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Choose your network role and provide your operational details."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid gap-2",
							children: ROLES.map((r) => {
								const Icon = r.icon;
								const on = role === r.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setRole(r.id),
									className: cn("flex min-h-14 items-center gap-3 rounded-lg px-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150", on ? "bg-fg text-bg" : "bg-bg hover:shadow-[var(--shadow-border-hover)]"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-semibold",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("block text-xs", on ? "opacity-70" : "text-muted"),
										children: r.copy
									})] })]
								}, r.id);
							})
						}),
						role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-5 grid gap-3",
							onSubmit: submit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true,
										placeholder: "Your name"
									})]
								}),
								role === "receiver" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "org",
										children: "Camp / organisation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "org",
										value: orgName,
										onChange: (e) => setOrgName(e.target.value),
										required: true,
										placeholder: "Camp Sundari"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "loc",
										children: "Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "loc",
										value: location,
										onChange: (e) => setLocation(e.target.value),
										required: true,
										placeholder: "East Bank"
									})]
								})] }) : null,
								role === "donor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "pref",
										children: "Preferred contribution"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "pref",
										value: contributionType,
										onChange: (e) => setContributionType(e.target.value),
										className: selectClass,
										children: RESOURCES.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: k,
											children: RESOURCE_LABEL[k]
										}, k))
									})]
								}) : null,
								role === "coordinator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "region",
										children: "Assigned region"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "region",
										value: region,
										onChange: (e) => setRegion(e.target.value),
										required: true,
										placeholder: "Kaveri Basin"
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "primary",
									className: "cursor-pointer",
									children: "Complete Registration"
								}),
								false
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm text-muted",
							children: "Select a role to continue."
						}),
						false
					] })
				})]
			})
		]
	});
}
function HeroStat({ k, v, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("mt-1 font-mono text-2xl font-semibold tracking-tight tabular sm:text-3xl", tone === "critical" && "text-critical"),
			children: v
		})]
	});
}
function Legend({ c, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center gap-1.5 text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", c) }), l]
	});
}
//#endregion
export { LoginPage as component };
