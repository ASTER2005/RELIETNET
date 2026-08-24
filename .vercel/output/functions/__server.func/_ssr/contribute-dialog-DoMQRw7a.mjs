import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-CDZDJGL5.mjs";
import { n as Input, r as Label, t as Button } from "./label-C4XT45Y8.mjs";
import { t as Textarea } from "./textarea-sh4dtrlH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as formatNumber, p as useReliefStore, s as RESOURCE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contribute-dialog-DoMQRw7a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContributeDialog({ requirementId, open, onOpenChange }) {
	const item = useReliefStore((s) => s.requirements.find((r) => r.id === requirementId));
	const contribute = useReliefStore((s) => s.contribute);
	const navigate = useNavigate();
	const remaining = item ? Math.max(0, item.quantityNeeded - item.quantityFulfilled) : 0;
	const [qty, setQty] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const submit = () => {
		if (!item) return;
		const n = Number(qty);
		if (!Number.isFinite(n) || n <= 0) {
			toast.error("Enter a quantity to send.");
			return;
		}
		const tx = contribute(item.id, n, notes);
		toast.success(`Committed ${tx.quantity} ${tx.quantityUnit} to ${item.campName}.`);
		setQty("");
		setNotes("");
		onOpenChange(false);
		navigate({
			to: "/transactions/$id",
			params: { id: tx.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: open && !!item,
		onOpenChange: (v) => {
			if (!v) {
				setQty("");
				setNotes("");
			}
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Contribute" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
			item.campName,
			" needs ",
			formatNumber(remaining),
			" ",
			item.quantityUnit,
			" of",
			" ",
			RESOURCE_LABEL[item.resourceType].toLowerCase(),
			"."
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: "qty",
						children: [
							"Quantity (",
							item.quantityUnit,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qty",
						inputMode: "numeric",
						value: qty,
						onChange: (e) => setQty(e.target.value),
						placeholder: `Up to ${remaining}`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "notes",
						children: "Note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "notes",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						placeholder: "Pickup window, vehicle, contact…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: submit,
					children: "Commit contribution"
				})
			]
		})] }) : null })
	});
}
//#endregion
export { ContributeDialog as t };
