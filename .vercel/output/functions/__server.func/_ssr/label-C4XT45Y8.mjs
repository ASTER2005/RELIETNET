import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { m as cn } from "./router-ClfUIAXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-C4XT45Y8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-fg text-bg hover:opacity-90",
			primary: "bg-accent text-accent-fg hover:opacity-90",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:bg-surface-2",
			ghost: "bg-transparent text-fg hover:bg-surface-2",
			danger: "bg-critical text-accent-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 rounded-md px-3 text-sm",
			md: "h-[var(--control-h)] rounded-lg px-4 text-sm",
			lg: "h-12 rounded-lg px-5 text-base"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-[var(--control-h)] w-full rounded-lg bg-bg px-3 text-base text-fg shadow-[var(--shadow-border)] placeholder:text-subtle", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted uppercase", className),
	...props
}));
Label.displayName = "Label";
//#endregion
export { Input as n, Label as r, Button as t };
