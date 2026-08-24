import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { m as cn } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/switch-7mJ33n82.js
var import_jsx_runtime = require_jsx_runtime();
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-surface-2 shadow-[var(--shadow-border)] transition-colors", "data-[state=checked]:bg-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-surface shadow-sm transition-transform", "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1", "data-[state=checked]:bg-bg") })
	});
}
//#endregion
export { Switch as t };
