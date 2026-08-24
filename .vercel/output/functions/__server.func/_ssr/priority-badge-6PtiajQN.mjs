import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-z9sb49Tx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/priority-badge-6PtiajQN.js
var import_jsx_runtime = require_jsx_runtime();
var TONE = {
	critical: "critical",
	high: "high",
	moderate: "moderate",
	low: "low"
};
var LABEL = {
	critical: "Critical",
	high: "High",
	moderate: "Moderate",
	low: "Low"
};
function PriorityBadge({ priority, score }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		tone: TONE[priority],
		className: "gap-1.5",
		children: [LABEL[priority], typeof score === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular font-mono font-semibold opacity-80",
			children: score
		}) : null]
	});
}
//#endregion
export { PriorityBadge as t };
