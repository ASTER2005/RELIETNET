import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as PageHeader } from "./app-shell-DnhJ4uQV.mjs";
import { t as ContributeDialog } from "./contribute-dialog-DoMQRw7a.mjs";
import { t as RequirementCard } from "./requirement-card-brABdNs6.mjs";
import { a as PRIORITY_ORDER, m as cn, p as useReliefStore, s as RESOURCE_LABEL, v as selectClass } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-pcgCDe5-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRIORITIES = [
	"all",
	"critical",
	"high",
	"moderate",
	"low"
];
function FeedPage() {
	const user = useReliefStore((s) => s.currentUser);
	const requirements = useReliefStore((s) => s.requirements);
	const [priority, setPriority] = (0, import_react.useState)("all");
	const [resource, setResource] = (0, import_react.useState)("all");
	const [location, setLocation] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("priority");
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const locations = (0, import_react.useMemo)(() => [...new Set(requirements.map((r) => r.location))], [requirements]);
	const items = (0, import_react.useMemo)(() => {
		let list = requirements.slice();
		if (priority !== "all") list = list.filter((r) => r.priority === priority);
		if (resource !== "all") list = list.filter((r) => r.resourceType === resource);
		if (location !== "all") list = list.filter((r) => r.location === location);
		list.sort((a, b) => {
			if (sort === "people") return b.peopleAffected - a.peopleAffected;
			if (sort === "newest") return +new Date(b.createdAt) - +new Date(a.createdAt);
			return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || b.priorityScore - a.priorityScore;
		});
		return list;
	}, [
		requirements,
		priority,
		resource,
		location,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Open relief feed",
				title: "Requirements"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, { children: PRIORITIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: priority === p,
					tone: p === "all" ? void 0 : p,
					onClick: () => setPriority(p),
					children: p === "all" ? "All priority" : p
				}, p)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: resource,
							onChange: (e) => setResource(e.target.value),
							className: cn(selectClass, "w-auto bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All resources"
							}), Object.keys(RESOURCE_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: RESOURCE_LABEL[k]
							}, k))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: location,
							onChange: (e) => setLocation(e.target.value),
							className: cn(selectClass, "w-auto bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All locations"
							}), locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: l,
								children: l
							}, l))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: cn(selectClass, "w-auto bg-surface"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "priority",
									children: "Sort: priority"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "people",
									children: "Sort: people affected"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "newest",
									children: "Sort: newest"
								})
							]
						})
					]
				})]
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface px-4 py-10 text-center text-sm text-muted shadow-[var(--shadow-border)]",
				children: "No posts match these filters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementCard, {
					item,
					role: user?.role,
					onContribute: setOpenId
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributeDialog, {
				requirementId: openId,
				open: !!openId,
				onOpenChange: (v) => !v && setOpenId(null)
			})
		]
	});
}
function ChipRow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-[var(--space-page)] flex gap-2 overflow-x-auto px-[var(--space-page)] pb-1",
		children
	});
}
function Chip({ on, onClick, tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": on,
		className: cn("inline-flex h-10 shrink-0 items-center rounded-full px-3 text-xs font-semibold capitalize", on && !tone && "bg-fg text-bg", on && tone === "critical" && "bg-critical text-accent-fg", on && tone === "high" && "bg-high text-accent-fg", on && tone === "moderate" && "bg-moderate text-accent-fg", on && tone === "low" && "bg-low text-accent-fg", !on && "bg-surface text-muted shadow-[var(--shadow-border)]"),
		children
	});
}
//#endregion
export { FeedPage as component };
