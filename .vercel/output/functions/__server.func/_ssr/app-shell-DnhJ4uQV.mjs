import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as Ellipsis, c as Radio, g as LayoutGrid, l as Plus, o as Scale, p as LogOut, s as RotateCcw, u as Map, w as ArrowLeftRight, x as ClipboardList } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-CDZDJGL5.mjs";
import { t as Switch } from "./switch-7mJ33n82.mjs";
import { l as ROLE_LABEL, m as cn, p as useReliefStore } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-DnhJ4uQV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/dashboard",
		label: "Home",
		icon: LayoutGrid
	},
	{
		to: "/feed",
		label: "Feed",
		icon: Radio
	},
	{
		to: "/post",
		label: "Post",
		icon: Plus,
		roles: ["receiver"]
	},
	{
		to: "/surplus",
		label: "Surplus",
		icon: ArrowLeftRight
	},
	{
		to: "/map",
		label: "Map",
		icon: Map
	},
	{
		to: "/transactions",
		label: "Transfers",
		icon: ClipboardList
	},
	{
		to: "/audit",
		label: "Audit",
		icon: Scale
	}
];
var PRIMARY = {
	donor: [
		"/dashboard",
		"/feed",
		"/map",
		"/transactions"
	],
	receiver: [
		"/dashboard",
		"/feed",
		"/post",
		"/transactions"
	],
	coordinator: [
		"/dashboard",
		"/feed",
		"/surplus",
		"/transactions"
	]
};
function AppShell({ children }) {
	const user = useReliefStore((s) => s.currentUser);
	const fieldMode = useReliefStore((s) => s.fieldMode);
	const toggleFieldMode = useReliefStore((s) => s.toggleFieldMode);
	const logout = useReliefStore((s) => s.logout);
	const resetDemo = useReliefStore((s) => s.resetDemo);
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const items = NAV.filter((n) => !n.roles || user && n.roles.includes(user.role));
	const primaryTos = user ? PRIMARY[user.role] : PRIMARY.donor;
	const primary = primaryTos.map((to) => items.find((i) => i.to === to)).filter((x) => Boolean(x));
	const overflow = items.filter((i) => !primaryTos.includes(i.to));
	const signOut = () => {
		logout();
		navigate({ to: "/" });
	};
	const isOn = (to) => pathname === to || pathname.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center gap-3 px-[var(--space-page)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "flex items-center gap-2 font-semibold tracking-tight",
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
								className: "text-sm tracking-[0.14em]",
								children: "RELIETNET"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-6 hidden items-center gap-1 lg:flex",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("inline-flex h-9 items-center rounded-md px-3 text-sm", isOn(item.to) ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs font-medium text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Field mode"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: fieldMode,
									onCheckedChange: () => toggleFieldMode(),
									"aria-label": "Field mode"
								})]
							}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-2 sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium leading-none",
										children: user.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-[11px] text-subtle",
										children: [ROLE_LABEL[user.role], user.orgName ? ` · ${user.orgName}` : ""]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-10 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg",
									onClick: signOut,
									"aria-label": "Sign out",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
								})]
							}) : null]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 bg-accent" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-[var(--space-page)] pt-6 pb-28 lg:pb-12",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mx-auto grid max-w-6xl grid-cols-5",
					children: [primary.map((item) => {
						const Icon = item.icon;
						const on = isOn(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium", on ? "text-fg" : "text-subtle"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}) }, item.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMoreOpen(true),
						className: cn("flex min-h-14 w-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium", moreOpen ? "text-fg" : "text-subtle"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" }), "More"]
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: moreOpen,
				onOpenChange: setMoreOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: user?.name ?? "Menu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: user ? `${ROLE_LABEL[user.role]}${user.orgName ? ` · ${user.orgName}` : ""}${user.region ? ` · ${user.region}` : ""}` : "Navigation" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "grid gap-1",
						children: overflow.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setMoreOpen(false),
								className: cn("flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm", isOn(item.to) ? "bg-surface-2 font-medium" : "hover:bg-bg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted" }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid gap-2 border-t border-border pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-12 items-center justify-between rounded-lg bg-bg px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Field mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: fieldMode,
									onCheckedChange: () => toggleFieldMode(),
									"aria-label": "Field mode"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm hover:bg-bg",
								onClick: () => {
									setMoreOpen(false);
									signOut();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 text-muted" }), "Sign out"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm text-muted hover:bg-bg",
								onClick: () => {
									resetDemo();
									setMoreOpen(false);
									navigate({ to: "/" });
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset seeded demo"]
							})
						]
					})
				] })
			})
		]
	});
}
function PageHeader({ kicker, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-medium tracking-[0.16em] text-muted uppercase",
			children: kicker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
			children: title
		})] }), action]
	});
}
function Bento({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4", className),
		children
	});
}
function BentoCell({ label, value, hint, tone, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-wide text-muted uppercase",
				children: label
			}),
			value !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 font-mono text-3xl font-semibold tracking-tight tabular", tone === "critical" && "text-critical", tone === "high" && "text-high"),
				children: value
			}) : null,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null,
			children
		]
	});
}
//#endregion
export { PageHeader as i, Bento as n, BentoCell as r, AppShell as t };
