import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-z9sb49Tx.mjs";
import { u as STAGE_LABEL } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-DCxNGzvR.js
var import_jsx_runtime = require_jsx_runtime();
function StageBadge({ stage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: stage === "confirmed" || stage === "delivered" ? "delivered" : stage === "in_transit" || stage === "received_by_coordinator" ? "transit" : stage === "donated" ? "ink" : "pending",
		children: STAGE_LABEL[stage]
	});
}
function VerifyBadge({ status }) {
	if (status === "verified") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "delivered",
		children: "Verified"
	});
	if (status === "mismatch_flagged") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "critical",
		children: "Mismatch flagged"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "pending",
		children: "Pending review"
	});
}
//#endregion
export { VerifyBadge as n, StageBadge as t };
