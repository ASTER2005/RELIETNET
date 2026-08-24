import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as computePriorityScore } from "./seed-o426wP7e.mjs";
import { i as PageHeader } from "./app-shell-DnhJ4uQV.mjs";
import { n as Input, r as Label, t as Button } from "./label-C4XT45Y8.mjs";
import { t as Textarea } from "./textarea-sh4dtrlH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PriorityBadge } from "./priority-badge-6PtiajQN.mjs";
import { c as RESOURCE_UNIT, p as useReliefStore, s as RESOURCE_LABEL, v as selectClass } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-BLAAXKiy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RESOURCES = Object.keys(RESOURCE_LABEL);
function PostPage() {
	const user = useReliefStore((s) => s.currentUser);
	const postRequirement = useReliefStore((s) => s.postRequirement);
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [resourceType, setResourceType] = (0, import_react.useState)("food");
	const [quantityNeeded, setQuantityNeeded] = (0, import_react.useState)("100");
	const [peopleAffected, setPeopleAffected] = (0, import_react.useState)("200");
	const [durationDays, setDurationDays] = (0, import_react.useState)("3");
	const [urgency, setUrgency] = (0, import_react.useState)(4);
	const [notes, setNotes] = (0, import_react.useState)("");
	const preview = computePriorityScore({
		peopleAffected: Number(peopleAffected) || 0,
		quantityRequired: Number(quantityNeeded) || 0,
		durationDays: Number(durationDays) || 0,
		urgency
	});
	if (user?.role !== "receiver") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Only camp receivers can post requirements. Switch identity from the sign-in screen."
	});
	const submit = (e) => {
		e.preventDefault();
		const item = postRequirement({
			title: title || `${RESOURCE_LABEL[resourceType]} for ${user.orgName ?? "camp"}`,
			resourceType,
			quantityNeeded: Number(quantityNeeded) || 1,
			peopleAffected: Number(peopleAffected) || 1,
			durationDays: Number(durationDays) || 1,
			urgency,
			notes
		});
		toast.success(`Posted · AI Priority ${item.priority.toUpperCase()} (${item.priorityScore})`);
		navigate({
			to: "/feed/$id",
			params: { id: item.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter mx-auto max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: user.orgName || "Receiver",
			title: "Post a requirement"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "title",
						children: "Title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "title",
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Kitchen tents out of rations",
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "res",
							children: "Resource"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "res",
							value: resourceType,
							onChange: (e) => setResourceType(e.target.value),
							className: selectClass,
							children: RESOURCES.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: RESOURCE_LABEL[k]
							}, k))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "qty",
							children: [
								"Quantity (",
								RESOURCE_UNIT[resourceType],
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "qty",
							inputMode: "numeric",
							value: quantityNeeded,
							onChange: (e) => setQuantityNeeded(e.target.value),
							required: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "people",
							children: "People affected"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "people",
							inputMode: "numeric",
							value: peopleAffected,
							onChange: (e) => setPeopleAffected(e.target.value),
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "days",
							children: "Duration (days)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "days",
							inputMode: "numeric",
							value: durationDays,
							onChange: (e) => setDurationDays(e.target.value),
							required: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: "urg",
						children: [
							"Urgency ",
							urgency,
							"/5"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "urg",
						type: "range",
						min: 1,
						max: 5,
						value: urgency,
						onChange: (e) => setUrgency(Number(e.target.value)),
						className: "w-full accent-[var(--rn-accent)]"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "notes",
						children: "Situation notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "notes",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						placeholder: "Access, storage, who is most at risk",
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-wide text-muted uppercase",
						children: "AI Priority Score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xl font-semibold tabular",
						children: preview.score
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, {
						priority: preview.priority,
						score: preview.score
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "primary",
					children: "Publish to feed"
				})
			]
		})]
	});
}
//#endregion
export { PostPage as component };
