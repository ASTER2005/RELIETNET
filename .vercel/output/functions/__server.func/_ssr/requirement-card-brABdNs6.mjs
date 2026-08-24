import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as MapPin } from "../_libs/lucide-react.mjs";
import { t as Button } from "./label-C4XT45Y8.mjs";
import { t as PriorityBadge } from "./priority-badge-6PtiajQN.mjs";
import { _ as formatWhen, h as formatNumber, m as cn, s as RESOURCE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requirement-card-brABdNs6.js
var import_jsx_runtime = require_jsx_runtime();
function RequirementCard({ item, role, onContribute, compact }) {
	const remaining = Math.max(0, item.quantityNeeded - item.quantityFulfilled);
	const pct = Math.min(100, Math.round(item.quantityFulfilled / Math.max(item.quantityNeeded, 1) * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("flex flex-col rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]", "transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, {
					priority: item.priority,
					score: item.priorityScore
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-subtle tabular",
					children: formatWhen(item.createdAt)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/feed/$id",
				params: { id: item.id },
				className: "mt-3 block min-h-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] font-medium tracking-wide text-muted uppercase",
					children: [
						RESOURCE_LABEL[item.resourceType],
						" · ",
						item.campName
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-base font-semibold leading-snug tracking-tight",
					children: item.title
				})]
			}),
			!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-2 text-sm text-muted",
				children: item.notes
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-4 grid gap-3", compact ? "grid-cols-2" : "grid-cols-3"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "People",
						v: formatNumber(item.peopleAffected)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Needed",
						v: `${formatNumber(remaining)}`,
						sub: item.quantityUnit
					}),
					!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Duration",
						v: `${item.durationDays}d`
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex justify-between text-[11px] text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fulfilled" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular",
						children: [pct, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full rounded-full", item.priority === "critical" && "bg-critical", item.priority === "high" && "bg-high", item.priority === "moderate" && "bg-moderate", item.priority === "low" && "bg-low"),
						style: { width: `${pct}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex min-w-0 items-center gap-1 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: item.location
					})]
				}), role === "donor" && remaining > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "primary",
					onClick: () => onContribute?.(item.id),
					children: "Contribute"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/feed/$id",
						params: { id: item.id },
						children: "Details"
					})
				})]
			})
		]
	});
}
function Stat({ k, v, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] tracking-wide text-subtle uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "font-mono text-xl font-semibold leading-tight tracking-tight tabular",
		children: [v, sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-1 font-sans text-[11px] font-medium text-muted",
			children: sub
		}) : null]
	})] });
}
//#endregion
export { RequirementCard as t };
