import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as PageHeader } from "./app-shell-DnhJ4uQV.mjs";
import { n as Input, r as Label, t as Button } from "./label-C4XT45Y8.mjs";
import { t as Textarea } from "./textarea-sh4dtrlH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PriorityBadge } from "./priority-badge-6PtiajQN.mjs";
import { _ as formatWhen, c as RESOURCE_UNIT, h as formatNumber, p as useReliefStore, s as RESOURCE_LABEL, v as selectClass } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/surplus-BFl830bF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RESOURCES = Object.keys(RESOURCE_LABEL);
function SurplusPage() {
	const user = useReliefStore((s) => s.currentUser);
	const surplus = useReliefStore((s) => s.surplus);
	const requirements = useReliefStore((s) => s.requirements);
	const postSurplus = useReliefStore((s) => s.postSurplus);
	const matchSurplus = useReliefStore((s) => s.matchSurplus);
	const navigate = useNavigate();
	const [resourceType, setResourceType] = (0, import_react.useState)("food");
	const [quantity, setQuantity] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const available = surplus.filter((s) => s.status === "available" && s.quantity > 0);
	const submit = (e) => {
		e.preventDefault();
		const n = Number(quantity);
		if (!Number.isFinite(n) || n <= 0) {
			toast.error("Enter a surplus quantity.");
			return;
		}
		postSurplus({
			resourceType,
			quantity: n,
			notes
		});
		toast.success("Surplus listed for coordinators.");
		setQuantity("");
		setNotes("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Redistribution",
				title: "Surplus board"
			}),
			user?.role === "receiver" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mb-8 grid gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "rt",
							children: "Resource"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "rt",
							value: resourceType,
							onChange: (e) => setResourceType(e.target.value),
							className: selectClass,
							children: RESOURCES.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: RESOURCE_LABEL[k]
							}, k))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "sq",
							children: [
								"Quantity (",
								RESOURCE_UNIT[resourceType],
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "sq",
							inputMode: "numeric",
							value: quantity,
							onChange: (e) => setQuantity(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "sn",
							children: "Note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "sn",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							placeholder: "Condition, packing, pickup window"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "primary",
							children: "List surplus"
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: available.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-surface px-4 py-10 text-center text-sm text-muted shadow-[var(--shadow-border)]",
					children: "No surplus listed."
				}) : available.map((s) => {
					const match = requirements.filter((r) => r.resourceType === s.resourceType && r.status !== "fulfilled" && r.receiverId !== s.receiverId).sort((a, b) => b.priorityScore - a.priorityScore)[0];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-medium tracking-wide text-muted uppercase",
									children: [
										s.campName,
										" · ",
										s.location
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-1 text-lg font-semibold",
									children: [
										formatNumber(s.quantity),
										" ",
										s.quantityUnit,
										" ",
										RESOURCE_LABEL[s.resourceType].toLowerCase()
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-subtle",
									children: formatWhen(s.createdAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.notes
							}),
							match ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-col gap-3 rounded-lg bg-bg p-3 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "Suggested high-need camp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium",
										children: [
											match.campName,
											" · ",
											match.title
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, {
											priority: match.priority,
											score: match.priorityScore
										})
									})
								] }), user?.role === "coordinator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "primary",
									onClick: () => {
										const tx = matchSurplus(s.id, match.id);
										if (tx) {
											toast.success("Transfer arranged.");
											navigate({
												to: "/transactions/$id",
												params: { id: tx.id }
											});
										}
									},
									children: "Match & arrange transfer"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-subtle",
									children: "Coordinators arrange the transfer."
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-subtle",
								children: "No open need of this type right now."
							})
						]
					}, s.id);
				})
			})
		]
	});
}
//#endregion
export { SurplusPage as component };
