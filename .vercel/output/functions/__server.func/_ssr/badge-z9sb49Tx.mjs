import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { m as cn } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-z9sb49Tx.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase", {
	variants: { tone: {
		critical: "bg-critical/12 text-critical",
		high: "bg-high/12 text-high",
		moderate: "bg-moderate/15 text-moderate",
		low: "bg-low/12 text-low",
		pending: "bg-pending/12 text-pending",
		transit: "bg-transit/12 text-transit",
		delivered: "bg-delivered/12 text-delivered",
		muted: "bg-surface-2 text-muted",
		ink: "bg-fg text-bg"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
//#endregion
export { Badge as t };
