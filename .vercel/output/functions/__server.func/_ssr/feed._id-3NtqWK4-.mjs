import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as StageBadge } from "./status-badge-DCxNGzvR.mjs";
import { t as Button } from "./label-C4XT45Y8.mjs";
import { t as ContributeDialog } from "./contribute-dialog-DoMQRw7a.mjs";
import { t as PriorityBadge } from "./priority-badge-6PtiajQN.mjs";
import { _ as formatWhen, h as formatNumber, p as useReliefStore, r as Route$2, s as RESOURCE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed._id-3NtqWK4-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RequirementDetailPage() {
	const { id } = Route$2.useParams();
	const user = useReliefStore((s) => s.currentUser);
	const item = useReliefStore((s) => s.requirements.find((r) => r.id === id));
	const related = useReliefStore((s) => s.transactions.filter((t) => t.requirementId === id));
	const [open, setOpen] = (0, import_react.useState)(false);
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"Requirement not found.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/feed",
				className: "text-fg underline",
				children: "Back to feed"
			})
		]
	});
	const remaining = Math.max(0, item.quantityNeeded - item.quantityFulfilled);
	const b = item.scoreBreakdown;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] font-medium tracking-[0.16em] text-muted uppercase",
				children: [
					item.campName,
					" · ",
					item.location
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, {
					priority: item.priority,
					score: item.priorityScore
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-subtle",
					children: formatWhen(item.createdAt)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-semibold tracking-tight",
				children: item.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base leading-relaxed text-muted",
				children: item.notes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						k: "People",
						v: formatNumber(item.peopleAffected)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						k: "Still needed",
						v: formatNumber(remaining),
						sub: item.quantityUnit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						k: "Duration",
						v: `${item.durationDays} days`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						k: "Resource",
						v: RESOURCE_LABEL[item.resourceType]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "AI Priority Score"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Rule-based prototype — not a trained model. Weighted from people at risk, unfilled gap, time pressure, and stated urgency."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-mono text-4xl font-semibold tabular",
						children: [item.priorityScore, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 font-sans text-sm font-medium text-muted",
							children: ["/ 100 · ", item.priority]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePart, {
								k: "People",
								v: b.people
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePart, {
								k: "Resource gap",
								v: b.gap
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePart, {
								k: "Time",
								v: b.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorePart, {
								k: "Urgency",
								v: b.urgency
							})
						]
					})
				]
			}),
			user?.role === "donor" && remaining > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					onClick: () => setOpen(true),
					children: ["Contribute ", item.quantityUnit]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Linked transfers"
				}), related.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No contributions yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border rounded-xl bg-surface shadow-[var(--shadow-border)]",
					children: related.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/transactions/$id",
						params: { id: t.id },
						className: "flex min-h-14 items-center justify-between gap-3 px-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t.donorName,
							" · ",
							t.quantity,
							" ",
							t.quantityUnit
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: t.stage })]
					}) }, t.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributeDialog, {
				requirementId: item.id,
				open,
				onOpenChange: setOpen
			})
		]
	});
}
function Metric({ k, v, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-subtle uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "mt-1 font-mono text-2xl font-semibold tracking-tight tabular",
			children: [v, sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 font-sans text-xs font-medium text-muted",
				children: sub
			}) : null]
		})]
	});
}
function ScorePart({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-lg bg-bg px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-lg font-semibold tabular",
			children: v
		})]
	});
}
//#endregion
export { RequirementDetailPage as component };
