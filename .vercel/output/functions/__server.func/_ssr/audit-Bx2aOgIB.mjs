import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as PageHeader } from "./app-shell-DnhJ4uQV.mjs";
import { t as Badge } from "./badge-z9sb49Tx.mjs";
import { n as VerifyBadge, t as StageBadge } from "./status-badge-DCxNGzvR.mjs";
import { g as formatStamp, p as useReliefStore, u as STAGE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-Bx2aOgIB.js
var import_jsx_runtime = require_jsx_runtime();
function AuditPage() {
	const transactions = useReliefStore((s) => s.transactions.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rn-enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Transparency",
				title: "Audit trail"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 max-w-2xl text-sm text-muted",
				children: "Full chain for every transfer: donor, coordinator, receiver, proofs, and verification. Anyone on the network can inspect a record."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: transactions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-subtle",
									children: t.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: t.stage }),
								t.disputed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "critical",
									children: "Disputed"
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-base font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/transactions/$id",
								params: { id: t.id },
								className: "hover:underline",
								children: [
									t.donorName,
									" → ",
									t.coordinatorName ?? "unassigned",
									" → ",
									t.campName
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								t.quantity,
								" ",
								t.quantityUnit,
								" · declared ",
								t.declaredAmount
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-4 space-y-1.5 border-l border-border pl-4 text-sm",
							children: t.stageHistory.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-fg",
										children: STAGE_LABEL[h.stage]
									}),
									" · ",
									h.by,
									" · ",
									formatStamp(h.at)
								]
							}, `${h.stage}-${i}`))
						}),
						t.proofs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-wrap gap-2",
							children: t.proofs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 rounded-full bg-bg px-3 py-1 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: p.fileName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyBadge, { status: p.verification })]
							}, p.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-subtle",
							children: "No proof attached."
						})
					]
				}, t.id))
			})
		]
	});
}
//#endregion
export { AuditPage as component };
