import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as PageHeader } from "./app-shell-DnhJ4uQV.mjs";
import { t as Badge } from "./badge-z9sb49Tx.mjs";
import { t as StageBadge } from "./status-badge-DCxNGzvR.mjs";
import { _ as formatWhen, p as useReliefStore, s as RESOURCE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-Bf23cC5n.js
var import_jsx_runtime = require_jsx_runtime();
function TransactionsPage() {
	const user = useReliefStore((s) => s.currentUser);
	const all = useReliefStore((s) => s.transactions);
	const list = user?.role === "coordinator" ? all : all.filter((t) => t.donorId === user?.id || t.receiverId === user?.id || t.coordinatorId === user?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Pipeline",
			title: "Transfers"
		}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-xl bg-surface px-4 py-10 text-center text-sm text-muted shadow-[var(--shadow-border)]",
			children: "No transfers yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
			children: list.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/transactions/$id",
				params: { id: t.id },
				className: "flex min-h-16 flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-sm font-medium",
						children: [
							t.donorName,
							" → ",
							t.campName
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							t.quantity,
							" ",
							t.quantityUnit,
							" ",
							RESOURCE_LABEL[t.resourceType].toLowerCase(),
							" ",
							"· ",
							formatWhen(t.createdAt),
							t.kind === "redistribution" ? " · redistribution" : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [t.disputed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "critical",
						children: "Disputed"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: t.stage })]
				})]
			}) }, t.id))
		})]
	});
}
//#endregion
export { TransactionsPage as component };
